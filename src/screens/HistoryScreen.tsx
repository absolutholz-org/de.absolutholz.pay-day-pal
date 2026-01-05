import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  Firestore,
  doc,
  getDoc,
  where,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { X, ChevronLeft, Calendar, Loader } from 'lucide-react';
import { Household, Period } from '../types';
import {
  SettingsPage,
  SettingsContainer,
  SettingsHeader,
  SettingsTitle,
  CloseButton,
  HistoryList,
  HistoryItem,
  HistoryDateRange,
  CardMeta,
  ActivityGroup,
  ActivityDateHeader,
  ActivityRow,
} from '../styles';
import { ResetButton } from '../SharedComponents';

export default function HistoryScreen({
  isOpen,
  onClose,
  household,
  db,
  periodId,
  onSelectPeriod,
  onClearPeriod,
}: {
  isOpen: boolean;
  onClose: () => void;
  household: Household;
  db: Firestore;
  periodId: string | null;
  onSelectPeriod: (id: string) => void;
  onClearPeriod: () => void;
}) {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [groupedActivities, setGroupedActivities] = useState<
    { date: string; items: any[] }[]
  >([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchPeriods = async (isNextPage = false) => {
    setLoading(true);
    try {
      let q = query(
        collection(db, 'households', household.id, 'periods'),
        where('endDate', '!=', null),
        orderBy('createdAt', 'desc'),
        limit(10)
      );

      if (isNextPage && lastDoc) {
        q = query(
          collection(db, 'households', household.id, 'periods'),
          where('endDate', '!=', null),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(10)
        );
      }

      const snapshot = await getDocs(q);
      const newPeriods: Period[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Period[];

      if (snapshot.docs.length < 10) {
        setHasMore(false);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setPeriods((prev) =>
        isNextPage ? [...prev, ...newPeriods] : newPeriods
      );
    } catch (error) {
      console.error('Error fetching periods:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !periodId) {
      fetchPeriods();
    }
  }, [isOpen, periodId]);

  useEffect(() => {
    if (!isOpen) return;

    if (periodId) {
      if (selectedPeriod?.id === periodId) return;

      const load = async () => {
        setLoading(true);
        try {
          let period = periods.find((p) => p.id === periodId);

          if (!period) {
            const docRef = doc(
              db,
              'households',
              household.id,
              'periods',
              periodId
            );
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              period = { id: snap.id, ...snap.data() } as Period;
            }
          }

          if (period) {
            await loadPeriodDetails(period);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      load();
    } else {
      setSelectedPeriod(null);
      setGroupedActivities([]);
    }
  }, [periodId, isOpen, household.id, db]);

  const loadPeriodDetails = async (period: Period) => {
    setLoading(true);
    setSelectedPeriod(period);
    const allActivities: any[] = [];

    try {
      await Promise.all(
        household.members.map(async (member) => {
          const docRef = doc(
            db,
            'households',
            household.id,
            'activity',
            member.id
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();

            Object.entries(data).forEach(([key, value]) => {
              // key is YYYY-MM-DD_choreId
              const [dateStr, choreId] = key.split('_');
              if (
                dateStr >= period.startDate &&
                period.endDate &&
                dateStr < period.endDate
              ) {
                const chore = household.chores.find((c) => c.id === choreId);
                if (chore) {
                  const count =
                    typeof value === 'number' ? value : (value as any).count;
                  if (count > 0) {
                    allActivities.push({
                      date: dateStr,
                      member,
                      chore,
                      count,
                    });
                  }
                }
              }
            });
          }
        })
      );

      // Sort by date descending
      allActivities.sort((a, b) => b.date.localeCompare(a.date));

      // Group by date
      const grouped: { date: string; items: any[] }[] = [];
      let currentDate = '';
      let currentItems: any[] = [];

      allActivities.forEach((item) => {
        if (item.date !== currentDate) {
          if (currentDate)
            grouped.push({ date: currentDate, items: currentItems });
          currentDate = item.date;
          currentItems = [];
        }
        currentItems.push(item);
      });
      if (currentDate) grouped.push({ date: currentDate, items: currentItems });

      setGroupedActivities(grouped);
    } catch (error) {
      console.error('Error loading details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <SettingsPage>
      <SettingsContainer>
        <SettingsHeader>
          <SettingsTitle>
            {selectedPeriod ? 'Period Details' : 'History'}
          </SettingsTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </SettingsHeader>

        {selectedPeriod ? (
          <div>
            <ResetButton
              onClick={onClearPeriod}
              style={{ marginBottom: '1rem', background: '#95a5a6' }}
            >
              <ChevronLeft size={18} /> Back
            </ResetButton>
            <HistoryDateRange>
              {selectedPeriod.startDate} — {selectedPeriod.endDate}
            </HistoryDateRange>

            {groupedActivities.map((group) => {
              const [y, m, d] = group.date.split('-').map(Number);
              const dateObj = new Date(y, m - 1, d);
              return (
                <ActivityGroup key={group.date}>
                  <ActivityDateHeader>
                    {dateObj.toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </ActivityDateHeader>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {group.items.map((item, idx) => (
                      <ActivityRow key={idx}>
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <span
                            style={{ fontWeight: 600, fontSize: '0.95rem' }}
                          >
                            {item.member.name}
                          </span>
                          <span
                            style={{ color: '#7f8c8d', fontSize: '0.9rem' }}
                          >
                            {item.chore.labels?.en || item.chore.label}{' '}
                            {item.count > 1 && `(${item.count})`}
                          </span>
                        </div>
                        <span style={{ fontWeight: 600, color: '#27ae60' }}>
                          €{(item.count * item.chore.value).toFixed(2)}
                        </span>
                      </ActivityRow>
                    ))}
                  </div>
                </ActivityGroup>
              );
            })}

            {groupedActivities.length === 0 && !loading && (
              <div
                style={{
                  textAlign: 'center',
                  color: '#7f8c8d',
                  padding: '2rem',
                }}
              >
                No activities found for this period.
              </div>
            )}
          </div>
        ) : (
          <>
            <HistoryList>
              {periods.map((period) => (
                <HistoryItem
                  key={period.id}
                  onClick={() => onSelectPeriod(period.id)}
                >
                  <HistoryDateRange>
                    {period.startDate} — {period.endDate || 'Current'}
                  </HistoryDateRange>
                  <CardMeta>
                    <Calendar size={14} /> View Details
                  </CardMeta>
                </HistoryItem>
              ))}
            </HistoryList>
            {hasMore && (
              <ResetButton
                onClick={() => fetchPeriods(true)}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  justifyContent: 'center',
                }}
                disabled={loading}
              >
                {loading ? (
                  <Loader
                    size={18}
                    style={{ animation: 'spin 1s linear infinite' }}
                  />
                ) : (
                  'Load More'
                )}
              </ResetButton>
            )}
          </>
        )}
      </SettingsContainer>
    </SettingsPage>
  );
}
