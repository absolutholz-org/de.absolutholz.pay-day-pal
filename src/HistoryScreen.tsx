import React, { useState, useEffect } from 'react';
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
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { X, ChevronLeft, Calendar, Loader } from 'lucide-react';
import { Household, Period } from './types';
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
} from './styles';
import { ResetButton } from './SharedComponents';

export default function HistoryScreen({
  isOpen,
  onClose,
  household,
  db,
}: {
  isOpen: boolean;
  onClose: () => void;
  household: Household;
  db: Firestore;
}) {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [periodDetails, setPeriodDetails] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPeriods = async (isNextPage = false) => {
    setLoading(true);
    try {
      let q = query(
        collection(db, 'households', household.id, 'periods'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );

      if (isNextPage && lastDoc) {
        q = query(
          collection(db, 'households', household.id, 'periods'),
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
    if (isOpen && !selectedPeriod) {
      fetchPeriods();
    }
  }, [isOpen, selectedPeriod]);

  const loadPeriodDetails = async (period: Period) => {
    setLoading(true);
    setSelectedPeriod(period);
    const details: any = {};

    try {
      for (const member of household.members) {
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
          const memberChores: any[] = [];
          let total = 0;

          Object.entries(data).forEach(([key, value]) => {
            // key is YYYY-MM-DD_choreId
            const [dateStr, choreId] = key.split('_');
            if (dateStr >= period.startDate && dateStr < period.endDate) {
              const chore = household.chores.find((c) => c.id === choreId);
              if (chore) {
                const count =
                  typeof value === 'number' ? value : (value as any).count;
                if (count > 0) {
                  memberChores.push({ chore, count, date: dateStr });
                  total += count * chore.value;
                }
              }
            }
          });

          if (memberChores.length > 0) {
            details[member.id] = { chores: memberChores, total };
          }
        }
      }
      setPeriodDetails(details);
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
              onClick={() => setSelectedPeriod(null)}
              style={{ marginBottom: '1rem', background: '#95a5a6' }}
            >
              <ChevronLeft size={18} /> Back
            </ResetButton>
            <HistoryDateRange>
              {selectedPeriod.startDate} — {selectedPeriod.endDate}
            </HistoryDateRange>
            {Object.entries(periodDetails || {}).map(
              ([memberId, data]: [string, any]) => {
                const member = household.members.find((m) => m.id === memberId);
                return (
                  <div key={memberId} style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>
                      {member?.name} — €{data.total.toFixed(2)}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      {data.chores.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0.5rem',
                            background: 'white',
                            borderRadius: '8px',
                            border: '1px solid #ecf0f1',
                          }}
                        >
                          <span>
                            {item.chore.labels?.en || item.chore.label} (
                            {item.count})
                          </span>
                          <span
                            style={{ color: '#7f8c8d', fontSize: '0.9rem' }}
                          >
                            {item.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <>
            <HistoryList>
              {periods.map((period) => (
                <HistoryItem
                  key={period.id}
                  onClick={() => loadPeriodDetails(period)}
                >
                  <HistoryDateRange>
                    {period.startDate} — {period.endDate}
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
