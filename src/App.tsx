import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  enableIndexedDbPersistence,
} from 'firebase/firestore';
import {
  RotateCcw,
  Euro,
  Minus,
  ChevronDown,
  ChevronUp,
  Settings,
  X,
  Plus,
  Users,
  ArrowLeft,
  Trash2,
  Loader,
} from 'lucide-react';
import SettingsScreen from './SettingsScreen';
import {
  FormGroup,
  Label,
  Input,
  ResetButton,
  IconButton,
} from './SharedComponents';
import { DEFAULT_CHORES } from './constants';

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
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err: any) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistence failed: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.warn('Persistence failed: Browser not supported');
  }
});

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;
`;

const BackButton = styled(IconButton)`
  right: auto;
  left: 0;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 3rem; /* Left of the settings/menu icon */
  color: #3498db;
  animation: spin 1s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  display: flex;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#3498db' : '#ecf0f1')};
  color: ${(props) => (props.active ? 'white' : '#7f8c8d')};
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background-color: ${(props) => (props.active ? '#2980b9' : '#bdc3c7')};
  }
`;

const BalanceDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  border: 1px solid #ecf0f1;
`;

const BalanceLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BalanceValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const DateScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.75rem;
  padding: 0.5rem 0.25rem;
  margin-bottom: 1.5rem;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DateCard = styled.button<{ active: boolean }>`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 4.5rem;
  padding: 0.75rem 0.5rem;
  background: ${(props) => (props.active ? '#2c3e50' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#2c3e50')};
  border: 1px solid ${(props) => (props.active ? '#2c3e50' : '#ecf0f1')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DateCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
`;

const DateWeekday = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;

  .long {
    display: none;
  }
  .short {
    display: block;
  }

  @media (min-width: 640px) {
    .long {
      display: block;
    }
    .short {
      display: none;
    }
  }
`;

const DateDay = styled.span`
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
`;

const ChoreList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
`;

const ChoreCard = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid ${(props) => (props.active ? '#2ecc71' : 'transparent')};
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.98);
  }
`;

const ChoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ChoreName = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
`;

const ChoreValue = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const ChoreCount = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CountBadge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2ecc71;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
`;

const DecrementButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #e74c3c;
  background: transparent;
  color: #e74c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;

  &:active {
    background: #e74c3c;
    color: white;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #ecf0f1;
`;

const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #bdc3c7;
  font-size: 1rem;
  font-family: inherit;
  color: #2c3e50;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #ecf0f1;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const CardMeta = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

type ChoreData = {
  [key: string]: number;
};

export type Member = {
  id: string;
  name: string;
};

export type Chore = {
  id: string;
  label?: string;
  labels?: { [key: string]: string };
  value: number;
  frequency: string;
  effort: string;
};

export type HouseholdSettings = {
  periodStart: string; // YYYY-MM-DD
};

export type Household = {
  id: string;
  name: string;
  members: Member[];
  chores: Chore[];
  settings: HouseholdSettings;
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
    if (saved && household.members.some((c) => c.id === saved)) {
      return saved;
    }
    return household.members[0]?.id || '';
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
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  const startNewPeriod = async () => {
    const childName = householdData.members.find(
      (c) => c.id === activeChild
    )?.name;
    if (
      window.confirm(
        `Start a new period? This will hide previous tasks for all members.`
      )
    ) {
      setChoreData({});
      try {
        const docRef = doc(db, 'households', householdData.id);
        // We update the period start to Today.
        // Note: This affects ALL members as it's a household setting.
        await updateDoc(docRef, {
          'settings.periodStart': formatDateKey(new Date()),
        });
        setPeriodStart(formatDateKey(new Date()));
      } catch (error) {
        console.error('Error starting new period:', error);
      }
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
        {householdData.members.map((child) => (
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
          <React.Fragment key={chore.id}>
            {(() => {
              const key = `${selectedDate}_${chore.id}`;
              const count = Number(choreData[key] || 0);
              return (
                <ChoreCard
                  active={count > 0}
                  onClick={() => updateChore(chore.id, selectedDate, 1)}
                >
                  <ChoreInfo>
                    <ChoreName>{chore.labels?.en || chore.label}</ChoreName>
                    <ChoreValue>
                      €{chore.value} · {chore.frequency} · {chore.effort} Effort
                    </ChoreValue>
                  </ChoreInfo>
                  <ChoreCount>
                    {count > 0 && (
                      <>
                        <DecrementButton
                          onClick={(e) => {
                            e.stopPropagation();
                            updateChore(chore.id, selectedDate, -1);
                          }}
                        >
                          <Minus size={16} strokeWidth={3} />
                        </DecrementButton>
                        <CountBadge>{count}</CountBadge>
                      </>
                    )}
                  </ChoreCount>
                </ChoreCard>
              );
            })()}
          </React.Fragment>
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
        activeChild={activeChild}
        setActiveChild={setActiveChild}
        onLeaveHousehold={onBack}
        onStartNewPeriod={startNewPeriod}
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
