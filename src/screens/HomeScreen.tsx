import {
  collection,
  doc,
  Firestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { Euro, Loader, Settings } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DateScroll } from "../components/DateScroll";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../context/DataContext";
import { useLocalization } from "../context/LocalizationContext";
import {
  BalanceDisplay,
  BalanceLabel,
  BalanceValue,
  Footer,
  LoadingIndicator,
  Subtitle,
  TabButton,
  TabContainer,
  TotalContainer,
} from "../globalStyles";
import { ChoreData, Household, Period } from "../types";
import { formatDateKey } from "../utils";
import { ChoreCardList } from "../components/ChoreCardList";

interface HomeScreenProps {
  household: Household;
  db: Firestore;
}

export default function HomeScreen({ household, db }: HomeScreenProps) {
  const { finishPeriod } = useData();
  const [householdData, setHouseholdData] = useState<Household>(household);
  const [choreData, setChoreData] = useState<ChoreData>({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()));
  const [activePeriod, setActivePeriod] = useState<Period | null>(null);
  const todayKey = formatDateKey(new Date());

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "households", household.id),
      { includeMetadataChanges: true },
      (docSnap) => {
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as Household;
          setHouseholdData(data);
          setIsSyncing(docSnap.metadata.fromCache);
        }
      },
    );
    return () => unsub();
  }, [household.id, db]);

  useEffect(() => {
    const q = query(
      collection(db, "households", household.id, "periods"),
      orderBy("startDate", "desc"),
      limit(1),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        const period = { id: snapshot.docs[0].id, ...docData } as Period;
        setActivePeriod(!period.endDate ? period : null);
      } else {
        setActivePeriod(null);
      }
    });
    return () => unsubscribe();
  }, [household.id, db]);

  const [activeChild, setActiveChild] = useState<string>(() => {
    const saved = localStorage.getItem(`payDayPal_activeChild_${household.id}`);
    const savedMember = household.members.find((c) => c.id === saved);
    if (savedMember && !savedMember.disabled) {
      return savedMember.id;
    }
    return household.members.find((m) => !m.disabled)?.id || "";
  });

  const periodDates = useMemo(() => {
    if (!activePeriod) return [];

    const start = new Date(activePeriod.startDate);
    const end = new Date(); // Today
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const dates: Date[] = [];
    const current = new Date(start);

    if (current > end) return [end];

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates.reverse();
  }, [activePeriod, todayKey]);

  const chores = householdData.chores;

  useEffect(() => {
    const currentMember = householdData.members.find(
      (m) => m.id === activeChild,
    );
    if (currentMember?.disabled) {
      const firstActive = householdData.members.find((m) => !m.disabled);
      if (firstActive) {
        setActiveChild(firstActive.id);
      }
    }
  }, [householdData, activeChild]);

  useEffect(() => {
    localStorage.setItem(
      `payDayPal_activeChild_${householdData.id}`,
      activeChild,
    );
  }, [activeChild, householdData.id]);

  useEffect(() => {
    const docRef = doc(
      db,
      "households",
      householdData.id,
      "activity",
      activeChild,
    );
    const unsubscribe = onSnapshot(
      docRef,
      { includeMetadataChanges: true },
      (docSnap) => {
        if (docSnap.exists()) {
          setChoreData(docSnap.data() as ChoreData);
        } else {
          setDoc(docRef, {});
        }
        setIsSyncing(docSnap.metadata.fromCache);
      },
      (error) => {
        console.error("Error fetching chores:", error);
      },
    );
    return () => unsubscribe();
  }, [activeChild, householdData.id, db]);

  const calculateTotal = () => {
    let total = 0;
    chores.forEach((chore) => {
      periodDates.forEach((date) => {
        const key = `${formatDateKey(date)}_${chore.id}`;
        const count = Number(choreData[key] || 0);
        total += chore.value * count;
      });
    });
    return total;
  };

  const calculateDailyTotal = (date: Date) => {
    let total = 0;
    const dateKey = formatDateKey(date);
    chores.forEach((chore) => {
      const key = `${dateKey}_${chore.id}`;
      const count = Number(choreData[key] || 0);
      total += chore.value * count;
    });
    return total;
  };

  const { t, language } = useLocalization();

  return (
    <>
      <PageHeader
        title={householdData.name}
        slotMain={<Subtitle>{t.trackChores}</Subtitle>}
        slotTrail={
          <Link to="/settings">
            <Settings size={24} />
          </Link>
        }
      />
      <PageContainer>
        {isSyncing && (
          <LoadingIndicator>
            <Loader size={20} />
          </LoadingIndicator>
        )}

        <TabContainer>
          {householdData.members
            .filter((m) => !m.disabled)
            .map((child) => (
              <TabButton
                key={child.id}
                active={activeChild === child.id}
                onClick={() => setActiveChild(child.id)}
              >
                {child.name}
              </TabButton>
            ))}
        </TabContainer>

        {!activePeriod ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              color: "#7f8c8d",
              gap: "1rem",
              flex: 1,
            }}
          >
            <p style={{ fontSize: "1.2rem" }}>{t.noActivePeriod}</p>
            <p>{t.startNewPeriodDescription}</p>

            <button
              onClick={() => finishPeriod(true)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              {t.startNewPeriodButton}
            </button>
          </div>
        ) : (
          <>
            <BalanceDisplay>
              <BalanceLabel>{t.currentEarnings}</BalanceLabel>
              <BalanceValue>
                <Euro size={36} strokeWidth={2.5} color="#27ae60" />
                {calculateTotal().toFixed(2)}
              </BalanceValue>
            </BalanceDisplay>

            <DateScroll
              dates={periodDates}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              getDailyTotal={calculateDailyTotal}
            />

            <ChoreCardList
              chores={chores}
              counts={choreData}
              currentActivityDate={selectedDate}
              currentMemberId={activeChild}
              language={language}
            />

            <Footer>
              <TotalContainer>
                <Euro size={32} color="#27ae60" />
                <span>
                  {t.totalEarned}: €{calculateTotal().toFixed(2)}
                </span>
              </TotalContainer>
            </Footer>
          </>
        )}
      </PageContainer>
    </>
  );
}
