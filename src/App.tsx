import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  initializeFirestore,
  limit,
  onSnapshot,
  orderBy,
  persistentLocalCache,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Euro, Loader, Settings } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ChoreButton } from './components/ChoreButton';
import { DateScroll } from './components/DateScroll';
import HistoryScreen from './screens/HistoryScreen';
import HouseholdSelectionScreen from './screens/HouseholdSelectionScreen';
import SettingsScreen from './screens/SettingsScreen';
import {
  BalanceDisplay,
  BalanceLabel,
  BalanceValue,
  ChoreList,
  Container,
  Footer,
  Header,
  IconButton,
  LoadingIndicator,
  Subtitle,
  TabButton,
  TabContainer,
  Title,
  TotalContainer,
} from './styles';
import { ChoreData, Household, Period } from './types';
import { formatDateKey } from './utils';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
function HouseholdTracker({
  household,
  onBack,
}: {
  household: Household;
  onBack: () => void;
}) {
  const [householdData, setHouseholdData] = useState<Household>(household);
  const [choreData, setChoreData] = useState<ChoreData>({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(
    () => window.location.pathname === '/settings'
  );

  const getPeriodIdFromPath = () => {
    const path = window.location.pathname;
    if (path.startsWith('/history/')) {
      return path.split('/history/')[1];
    }
    return null;
  };

  const [isHistoryOpen, setIsHistoryOpen] = useState(() =>
    window.location.pathname.startsWith('/history')
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()));
  const [activePeriod, setActivePeriod] = useState<Period | null>(null);

  // Ensure we don't select a future date if app is left open
  const todayKey = formatDateKey(new Date());
  const [historyPeriodId, setHistoryPeriodId] = useState(getPeriodIdFromPath());

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'households', household.id),
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
  }, [household.id]);

  // Subscribe to the latest period to determine active state
  useEffect(() => {
    const q = query(
      collection(db, 'households', household.id, 'periods'),
      orderBy('startDate', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        const period = { id: snapshot.docs[0].id, ...docData } as Period;
        // If the latest period has no endDate, it is active
        setActivePeriod(!period.endDate ? period : null);
      } else {
        setActivePeriod(null);
      }
    });
    return () => unsubscribe();
  }, [household.id]);

  const [activeChild, setActiveChild] = useState<string>(() => {
    const saved = localStorage.getItem(`payDayPal_activeChild_${household.id}`);
    const savedMember = household.members.find((c) => c.id === saved);
    if (savedMember && !savedMember.disabled) {
      return savedMember.id;
    }
    return household.members.find((m) => !m.disabled)?.id || '';
  });

  const periodDates = useMemo(() => {
    if (!activePeriod) return [];

    const periodStart = activePeriod.startDate;

    const start = new Date(periodStart);
    const end = new Date(); // Today
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const dates: Date[] = [];
    const current = new Date(start);

    // Safety: if start is in future (shouldn't happen), just show today
    if (current > end) return [end];

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    // Show newest first? Or oldest first?
    // Scrolling list usually implies timeline. Let's do oldest to newest (left to right)
    // But user probably wants to see Today first. Let's reverse it?
    // Let's keep chronological order for now, but scroll to end could be nice.
    // Actually, for "scrolling list", usually you want Today easily accessible.
    // Let's reverse so Today is on the left/top.
    return dates.reverse();
  }, [activePeriod, todayKey]); // Depend on todayKey to refresh if day changes

  const chores = householdData.chores;

  useEffect(() => {
    const handlePopState = () => {
      setIsSettingsOpen(window.location.pathname === '/settings');
    };
    const handleHistoryPopState = () => {
      setIsHistoryOpen(window.location.pathname === '/history');
      setIsHistoryOpen(window.location.pathname.startsWith('/history'));
      setHistoryPeriodId(getPeriodIdFromPath());
    };
    window.addEventListener('popstate', handleHistoryPopState);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle active child being disabled
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

  // Sync settings to Local Storage and Firebase (Household Config)
  useEffect(() => {
    localStorage.setItem(
      `payDayPal_activeChild_${householdData.id}`,
      activeChild
    );
  }, [activeChild, householdData.id]);

  useEffect(() => {
    const docRef = doc(
      db,
      'households',
      householdData.id,
      'activity',
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
        console.error('Error fetching chores:', error);
      }
    );
    return () => unsubscribe();
  }, [activeChild, householdData.id]);

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
        'households',
        householdData.id,
        'activity',
        activeChild
      );
      await updateDoc(docRef, { [key]: newVal });
    } catch (error) {
      console.error('Error updating chore:', error);
    }
  };

  const startPeriod = async () => {
    const startDate = formatDateKey(new Date());
    try {
      await addDoc(collection(db, 'households', householdData.id, 'periods'), {
        startDate,
        endDate: null,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error starting period:', error);
    }
  };

  const finishPeriod = async (shouldStartNew: boolean) => {
    if (!activePeriod) return;
    const endDate = formatDateKey(new Date());
    try {
      // Close current period
      const periodRef = doc(
        db,
        'households',
        householdData.id,
        'periods',
        activePeriod.id
      );
      await updateDoc(periodRef, { endDate });

      if (shouldStartNew) {
        setChoreData({});
        await startPeriod();
      }
    } catch (error) {
      console.error('Error finishing period:', error);
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
    <Container>
      <Header>
        {isSyncing && (
          <LoadingIndicator>
            <Loader size={20} />
          </LoadingIndicator>
        )}
        <IconButton
          onClick={() => {
            window.history.pushState(null, '', '/settings');
            setIsSettingsOpen(true);
          }}
        >
          <Settings size={24} />
        </IconButton>
        <Title>{householdData.name}</Title>
        <Subtitle>Track chores and earn your allowance!</Subtitle>
      </Header>

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

      <BalanceDisplay>
        <BalanceLabel>Current Earnings</BalanceLabel>
        <BalanceValue>
          <Euro size={36} strokeWidth={2.5} color="#27ae60" />
          {calculateTotal().toFixed(2)}
        </BalanceValue>
      </BalanceDisplay>

      {activePeriod ? (
        <DateScroll
          dates={periodDates}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          getDailyTotal={calculateDailyTotal}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
          <p>No active period.</p>
          <p>Start a new period in Settings to track chores.</p>
        </div>
      )}

      <ChoreList>
        {chores.map((chore) => (
          <ChoreButton
            key={chore.id}
            chore={chore}
            count={Number(choreData[`${selectedDate}_${chore.id}`] || 0)}
            onIncrement={() => updateChore(chore.id, selectedDate, 1)}
            onDecrement={() => updateChore(chore.id, selectedDate, -1)}
          />
        ))}
      </ChoreList>

      <Footer>
        <TotalContainer>
          <Euro size={32} color="#27ae60" />
          <span>Total Earned: €{calculateTotal().toFixed(2)}</span>
        </TotalContainer>
      </Footer>

      <SettingsScreen
        isOpen={isSettingsOpen}
        onClose={() => {
          window.history.pushState(null, '', '/');
          setIsSettingsOpen(false);
        }}
        household={householdData}
        activePeriod={activePeriod}
        onLeaveHousehold={onBack}
        onFinishPeriod={finishPeriod}
        onStartPeriod={startPeriod}
        onViewHistory={() => {
          window.history.pushState(null, '', '/history');
          setIsHistoryOpen(true);
          setIsSettingsOpen(false);
        }}
        db={db}
      />

      <HistoryScreen
        isOpen={isHistoryOpen}
        onClose={() => {
          window.history.pushState(null, '', '/settings');
          setIsHistoryOpen(false);
          setIsSettingsOpen(true);
          setHistoryPeriodId(null);
        }}
        household={householdData}
        periodId={historyPeriodId}
        onSelectPeriod={(id) => {
          window.history.pushState(null, '', `/history/${id}`);
          setHistoryPeriodId(id);
        }}
        onClearPeriod={() => {
          window.history.pushState(null, '', '/history');
          setHistoryPeriodId(null);
        }}
        db={db}
      />
    </Container>
  );
}

function App() {
  const [currentHousehold, setCurrentHousehold] = useState<Household | null>(
    null
  );

  const handleSelectHousehold = (household: Household) => {
    setCurrentHousehold(household);
    localStorage.setItem('payDayPal_selectedHouseholdId', household.id);
  };

  const handleBackToHouseholds = () => {
    setCurrentHousehold(null);
    localStorage.removeItem('payDayPal_selectedHouseholdId');
  };

  if (currentHousehold) {
    return (
      <HouseholdTracker
        household={currentHousehold}
        onBack={handleBackToHouseholds}
      />
    );
  }

  return (
    <HouseholdSelectionScreen
      onSelectHousehold={handleSelectHousehold}
      db={db}
    />
  );
}

export default App;
