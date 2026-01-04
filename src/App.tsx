import { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  persistentLocalCache,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  collection,
  addDoc,
} from 'firebase/firestore';
import {
  Euro,
  Settings,
  Plus,
  Users,
  ArrowLeft,
  Trash2,
  Loader,
} from 'lucide-react';
import SettingsScreen from './SettingsScreen';
import HistoryScreen from './HistoryScreen';
import {
  FormGroup,
  Label,
  Input,
  ResetButton,
  IconButton,
} from './SharedComponents';
import { DEFAULT_CHORES } from './constants';
import { Household } from './types';
import { ChoreButton } from './components/ChoreButton';
import {
  Container,
  Header,
  BackButton,
  LoadingIndicator,
  Title,
  Subtitle,
  TabContainer,
  TabButton,
  BalanceDisplay,
  BalanceLabel,
  BalanceValue,
  DateScroll,
  DateCard,
  DateCardContent,
  DateWeekday,
  DateDay,
  ChoreList,
  Footer,
  TotalContainer,
  Card,
  CardTitle,
  CardMeta,
} from './styles';

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

type ChoreData = {
  [key: string]: number;
};

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
  const [isHistoryOpen, setIsHistoryOpen] = useState(
    () => window.location.pathname === '/history'
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()));

  // Ensure we don't select a future date if app is left open
  const todayKey = formatDateKey(new Date());

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

  const [activeChild, setActiveChild] = useState<string>(() => {
    const saved = localStorage.getItem(`payDayPal_activeChild_${household.id}`);
    const savedMember = household.members.find((c) => c.id === saved);
    if (savedMember && !savedMember.disabled) {
      return savedMember.id;
    }
    return household.members.find((m) => !m.disabled)?.id || '';
  });

  const [periodStart, setPeriodStart] = useState(
    householdData.settings.periodStart || formatDateKey(new Date())
  );

  const periodDates = useMemo(() => {
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
  }, [periodStart, todayKey]); // Depend on todayKey to refresh if day changes

  const chores = householdData.chores;

  useEffect(() => {
    const handlePopState = () => {
      setIsSettingsOpen(window.location.pathname === '/settings');
    };
    const handleHistoryPopState = () => {
      setIsHistoryOpen(window.location.pathname === '/history');
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

    const syncToFirebase = async () => {
      try {
        // We update the household document itself for settings
        const householdRef = doc(db, 'households', householdData.id);
        await updateDoc(householdRef, {
          'settings.periodStart': periodStart,
        });
      } catch (error) {
        console.error('Error syncing settings to Firebase:', error);
      }
    };
    // Debounce or only sync on change? For now, simple sync.
    if (periodStart !== householdData.settings.periodStart) syncToFirebase();
  }, [
    activeChild,
    periodStart,
    householdData.id,
    householdData.settings.periodStart,
  ]);

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

  const finishPeriod = async (shouldStartNew: boolean) => {
    const endDate = formatDateKey(new Date());
    try {
      // Always save period history
      await addDoc(collection(db, 'households', householdData.id, 'periods'), {
        startDate: periodStart,
        endDate: endDate,
        createdAt: new Date(),
      });

      if (shouldStartNew) {
        setChoreData({});
        const docRef = doc(db, 'households', householdData.id);
        await updateDoc(docRef, {
          'settings.periodStart': endDate,
        });
        setPeriodStart(endDate);
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

      <DateScroll>
        {periodDates.map((date) => {
          const dateKey = formatDateKey(date);
          const isActive = selectedDate === dateKey;
          return (
            <DateCard
              key={dateKey}
              active={isActive}
              onClick={() => setSelectedDate(dateKey)}
            >
              <DateCardContent>
                <DateWeekday>
                  <span className="short">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="long">
                    {date.toLocaleDateString('en-US', { weekday: 'long' })}
                  </span>
                </DateWeekday>
                <DateDay>
                  {date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </DateDay>
              </DateCardContent>
            </DateCard>
          );
        })}
      </DateScroll>

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
        onLeaveHousehold={onBack}
        onFinishPeriod={finishPeriod}
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
        }}
        household={householdData}
        db={db}
      />
    </Container>
  );
}

function App() {
  const [view, setView] = useState<'list' | 'create' | 'app'>('list');
  const [households, setHouseholds] = useState<Household[]>([]);
  const [currentHousehold, setCurrentHousehold] = useState<Household | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Create Household Form State
  const [newHouseholdName, setNewHouseholdName] = useState('');
  const [newMembers, setNewMembers] = useState<string[]>(['']);

  useEffect(() => {
    const q = collection(db, 'households');
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        try {
          const loadedHouseholds: Household[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as Omit<Household, 'id'>;
            loadedHouseholds.push({ id: doc.id, ...data });
          });
          setHouseholds(loadedHouseholds);

          // Auto-select if saved in local storage (only on first load or if not set)
          if (!currentHousehold) {
            const savedId = localStorage.getItem(
              'payDayPal_selectedHouseholdId'
            );
            if (savedId) {
              const found = loadedHouseholds.find((h) => h.id === savedId);
              if (found) {
                setCurrentHousehold(found);
                setView('app');
              }
            }
          }

          setLoading(false);
          setIsSyncing(snapshot.metadata.fromCache);
          setError(null);
        } catch (error) {
          console.error('Error loading households:', error);
          setError(
            'Unable to connect to Firebase. This is often caused by an ad blocker or browser extension. Please try disabling them.'
          );
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCreateHousehold = async () => {
    if (!newHouseholdName.trim()) return alert('Please enter a household name');
    const validMembers = newMembers
      .filter((m) => m.trim())
      .map((name) => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
      }));

    if (validMembers.length === 0)
      return alert('Please add at least one member');

    const newHousehold: Omit<Household, 'id'> = {
      name: newHouseholdName,
      members: validMembers,
      chores: DEFAULT_CHORES,
      settings: { periodStart: formatDateKey(new Date()) },
    };

    try {
      const docRef = await addDoc(collection(db, 'households'), newHousehold);
      const created = { id: docRef.id, ...newHousehold };
      setHouseholds([...households, created]);
      setCurrentHousehold(created);
      localStorage.setItem('payDayPal_selectedHouseholdId', created.id);
      setView('app');
    } catch (error) {
      console.error('Error creating household:', error);
      alert('Failed to create household');
    }
  };

  const handleSelectHousehold = (household: Household) => {
    setCurrentHousehold(household);
    localStorage.setItem('payDayPal_selectedHouseholdId', household.id);
    setView('app');
  };

  const handleBackToHouseholds = () => {
    setCurrentHousehold(null);
    localStorage.removeItem('payDayPal_selectedHouseholdId');
    setView('list');
  };

  if (loading) return <Container>Loading...</Container>;

  if (error) {
    return (
      <Container>
        <Header>
          <Title>Connection Error</Title>
          <Subtitle style={{ color: '#e74c3c' }}>{error}</Subtitle>
        </Header>
      </Container>
    );
  }

  if (view === 'app' && currentHousehold) {
    return (
      <HouseholdTracker
        household={currentHousehold}
        onBack={handleBackToHouseholds}
      />
    );
  }

  if (view === 'create') {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => setView('list')}>
            <ArrowLeft size={24} />
          </BackButton>
          <Title>New Household</Title>
        </Header>
        <FormGroup>
          <Label>Household Name</Label>
          <Input
            placeholder="e.g. The Smiths"
            value={newHouseholdName}
            onChange={(e) => setNewHouseholdName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Members</Label>
          {newMembers.map((member, index) => (
            <div
              key={index}
              style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}
            >
              <Input
                placeholder="Name"
                value={member}
                onChange={(e) => {
                  const updated = [...newMembers];
                  updated[index] = e.target.value;
                  setNewMembers(updated);
                }}
                style={{ marginBottom: 0 }}
              />
              {newMembers.length > 1 && (
                <IconButton
                  onClick={() =>
                    setNewMembers(newMembers.filter((_, i) => i !== index))
                  }
                  style={{ position: 'static', color: '#e74c3c' }}
                >
                  <Trash2 size={20} />
                </IconButton>
              )}
            </div>
          ))}
          <ResetButton
            onClick={() => setNewMembers([...newMembers, ''])}
            style={{ marginTop: '0.5rem', background: '#3498db' }}
          >
            <Plus size={18} /> Add Member
          </ResetButton>
        </FormGroup>
        <ResetButton
          onClick={handleCreateHousehold}
          style={{ marginTop: '2rem' }}
        >
          Create Household
        </ResetButton>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        {isSyncing && (
          <LoadingIndicator>
            <Loader size={20} />
          </LoadingIndicator>
        )}
        <Title>Select Household</Title>
      </Header>
      {households.map((h) => (
        <Card key={h.id} onClick={() => handleSelectHousehold(h)}>
          <CardTitle>{h.name}</CardTitle>
          <CardMeta>
            <Users size={16} /> {h.members.length} Members
          </CardMeta>
        </Card>
      ))}
      <ResetButton
        onClick={() => setView('create')}
        style={{ marginTop: '2rem', background: '#3498db' }}
      >
        <Plus size={18} /> Create New Household
      </ResetButton>
    </Container>
  );
}

export default App;
