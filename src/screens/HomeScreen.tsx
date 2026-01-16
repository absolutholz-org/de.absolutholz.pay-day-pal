import {
  collection,
  doc,
  Firestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Euro, Loader, Settings } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ChoreCard } from "../components/ChoreCard";
import { DateScroll } from "../components/DateScroll";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../context/DataContext";
import {
  BalanceDisplay,
  BalanceLabel,
  BalanceValue,
  ChoreList,
  Footer,
  LoadingIndicator,
  Subtitle,
  TabButton,
  TabContainer,
  TotalContainer,
} from "../globalStyles";
import { ChoreData, Household, Period } from "../types";
import { formatDateKey } from "../utils";

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
      }
    );
    return () => unsub();
  }, [household.id, db]);

  useEffect(() => {
    const q = query(
      collection(db, "households", household.id, "periods"),
      orderBy("startDate", "desc"),
      limit(1)
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
      (m) => m.id === activeChild
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
      activeChild
    );
  }, [activeChild, householdData.id]);

  useEffect(() => {
    const docRef = doc(
      db,
      "households",
      householdData.id,
      "activity",
      activeChild
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
      }
    );
    return () => unsubscribe();
  }, [activeChild, householdData.id, db]);

  const updateChore = async (
    choreId: string,
    dateString: string,
    change: number
  ) => {
    const key = `${dateString}_${choreId}`;
    const currentVal = Number(choreData[key] || 0);
    const newVal = Math.max(0, currentVal + change);
    const newData = { ...choreData, [key]: newVal };
    setChoreData(newData);

    try {
      const docRef = doc(
        db,
        "households",
        householdData.id,
        "activity",
        activeChild
      );
      await updateDoc(docRef, { [key]: newVal });
    } catch (error) {
      console.error("Error updating chore:", error);
    }
  };

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

  return (
    <>
      <PageHeader
        title={householdData.name}
        slotMain={<Subtitle>Track chores and earn your allowance!</Subtitle>}
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
            <p style={{ fontSize: "1.2rem" }}>No active period.</p>
            <p>Start a new period to track chores.</p>

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
              Start New Period
            </button>
          </div>
        ) : (
          <>
            <BalanceDisplay>
              <BalanceLabel>Current Earnings</BalanceLabel>
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

            <ChoreList role="list">
              {chores.map((chore) => (
                <li key={chore.id}>
                  <ChoreCard
                    label={chore.labels["en"]}
                    category={chore.category}
                    count={Number(
                      choreData[`${selectedDate}_${chore.id}`] || 0
                    )}
                    value={chore.value}
                    onIncrement={() => updateChore(chore.id, selectedDate, 1)}
                    onDecrement={() => updateChore(chore.id, selectedDate, -1)}
                  />
                </li>
              ))}
            </ChoreList>

            <Footer>
              <TotalContainer>
                <Euro size={32} color="#27ae60" />
                <span>Total Earned: €{calculateTotal().toFixed(2)}</span>
              </TotalContainer>
            </Footer>
          </>
        )}
      </PageContainer>
    </>
  );
}
