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
  getDocs,
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
} from 'lucide-react';

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

// Constants
const DEFAULT_CHORES = [
  {
    id: 'make-bed',
    label: 'Make Bed',
    value: 0.5,
    frequency: 'Daily',
    effort: 'Low',
  },
  {
    id: 'laundry-hang',
    label: 'Hang Laundry',
    value: 2,
    frequency: '2x/Week',
    effort: 'Medium',
  },
  {
    id: 'laundry-fold',
    label: 'Fold Laundry',
    value: 2,
    frequency: '2x/Week',
    effort: 'Medium',
  },
  {
    id: 'laundry-put-away',
    label: 'Put Away Laundry',
    value: 0.5,
    frequency: '2x/Week',
    effort: 'Low',
  },
  {
    id: 'dishwasher-empty',
    label: 'Empty the Dishwasher',
    value: 1,
    frequency: '3x/Week',
    effort: 'Medium',
  },
  {
    id: 'table-set',
    label: 'Set Table',
    value: 0.25,
    frequency: 'Daily',
    effort: 'Low',
  },
  {
    id: 'table-clean',
    label: 'Clean Table',
    value: 0.25,
    frequency: 'Daily',
    effort: 'Low',
  },
  {
    id: 'cook',
    label: 'Help with Cooking',
    value: 1.5,
    frequency: 'Daily',
    effort: 'High',
  },
  {
    id: 'tidy-living-room',
    label: 'Tidy-up the Living Room',
    value: 1,
    frequency: 'Daily',
    effort: 'Medium',
  },
  {
    id: 'tidy-bedroom',
    label: 'Tidy-up the Bedroom',
    value: 1,
    frequency: 'Daily',
    effort: 'Medium',
  },
];

const BASE_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 600px;
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

const IconButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #95a5a6;
  transition: color 0.2s;
  padding: 0.5rem;

  &:hover {
    color: #2c3e50;
  }
`;

const BackButton = styled(IconButton)`
  right: auto;
  left: 0;
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

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const AccordionItem = styled.div`
  border: 1px solid #ecf0f1;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const AccordionHeader = styled.button<{ active: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: ${(props) => (props.active ? '#f8f9fa' : 'white')};
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s;
`;

const DayTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
`;

const DayDate = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 400;
`;

const DayHeaderContent = styled.span`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const DayStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-left: auto;
  margin-right: 0.75rem;
  font-weight: 500;
`;

const AccordionContent = styled.div`
  padding: 1rem;
  background-color: #fdfcfb;
  border-top: 1px solid #ecf0f1;
`;

const ChoreList = styled.div`
  display: flex;
  flex-direction: column;
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

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: inherit;

  &:hover {
    background-color: #c0392b;
  }
`;

const SettingsPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fdfcfb;
  z-index: 1000;
  overflow-y: auto;
`;

const SettingsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-top: 1rem;
`;

const SettingsTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0.25rem;

  &:hover {
    color: #2c3e50;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
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

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #bdc3c7;
  font-size: 1rem;
  font-family: inherit;
  color: #2c3e50;
  background-color: white;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

type ChoreData = {
  [key: string]: number;
};

type Member = {
  id: string;
  name: string;
};

type Chore = {
  id: string;
  label: string;
  value: number;
  frequency: string;
  effort: string;
};

type HouseholdSettings = {
  weekStartDay: number;
};

type Household = {
  id: string;
  name: string;
  members: Member[];
  chores: Chore[];
  settings: HouseholdSettings;
};

function HouseholdTracker({
  household,
  onBack,
}: {
  household: Household;
  onBack: () => void;
}) {
  const [choreData, setChoreData] = useState<ChoreData>({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(
    () => window.location.pathname === '/settings'
  );
  const [activeChild, setActiveChild] = useState<string>(() => {
    const saved = localStorage.getItem(`payDayPal_activeChild_${household.id}`);
    if (saved && household.members.some((c) => c.id === saved)) {
      return saved;
    }
    return household.members[0]?.id || '';
  });
  const [weekStartDay, setWeekStartDay] = useState(
    household.settings.weekStartDay
  );
  const [expandedDayIndex, setExpandedDayIndex] = useState<number | null>(
    () => {
      const saved = localStorage.getItem('payDayPal_expandedDayIndex');
      if (saved !== null) {
        return parseInt(saved, 10);
      }
      const day = new Date().getDay(); // 0 = Sun, 1 = Mon
      return day === 0 ? 6 : day - 1; // Convert to 0=Mon, 6=Sun
    }
  );
  const [loading, setLoading] = useState(true);

  const chores = household.chores;

  const orderedDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(BASE_DAYS[(weekStartDay + i) % 7]);
    }
    return days;
  }, [weekStartDay]);

  useEffect(() => {
    const handlePopState = () => {
      setIsSettingsOpen(window.location.pathname === '/settings');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync settings to Local Storage and Firebase (Household Config)
  useEffect(() => {
    localStorage.setItem(`payDayPal_activeChild_${household.id}`, activeChild);

    const syncToFirebase = async () => {
      try {
        // We update the household document itself for settings
        const householdRef = doc(db, 'households', household.id);
        await updateDoc(householdRef, {
          'settings.weekStartDay': weekStartDay,
        });
      } catch (error) {
        console.error('Error syncing settings to Firebase:', error);
      }
    };
    // Debounce or only sync on change? For now, simple sync.
    if (weekStartDay !== household.settings.weekStartDay) syncToFirebase();
  }, [
    activeChild,
    weekStartDay,
    household.id,
    household.settings.weekStartDay,
  ]);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, 'households', household.id, 'activity', activeChild);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setChoreData(docSnap.data() as ChoreData);
        } else {
          setDoc(docRef, {});
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching chores:', error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [activeChild, household.id]);

  const toggleDay = (index: number) => {
    setExpandedDayIndex((prev) => {
      const newIndex = prev === index ? null : index;
      if (newIndex !== null) {
        localStorage.setItem('payDayPal_expandedDayIndex', String(newIndex));
      } else {
        localStorage.removeItem('payDayPal_expandedDayIndex');
      }
      return newIndex;
    });
  };

  const updateChore = async (
    choreId: string,
    dayIndex: number,
    change: number
  ) => {
    const key = `${choreId}-${dayIndex}`;
    const currentVal = Number(choreData[key] || 0);
    const newVal = Math.max(0, currentVal + change);
    const newData = { ...choreData, [key]: newVal };
    setChoreData(newData);

    try {
      const docRef = doc(
        db,
        'households',
        household.id,
        'activity',
        activeChild
      );
      await updateDoc(docRef, { [key]: newVal });
    } catch (error) {
      console.error('Error updating chore:', error);
    }
  };

  const resetWeek = async () => {
    const childName = household.members.find((c) => c.id === activeChild)?.name;
    if (
      window.confirm(
        `Are you sure you want to reset the week for ${childName}?`
      )
    ) {
      setChoreData({});
      try {
        const docRef = doc(
          db,
          'households',
          household.id,
          'activity',
          activeChild
        );
        await setDoc(docRef, {});
      } catch (error) {
        console.error('Error resetting week:', error);
      }
    }
  };

  const calculateTotal = () => {
    let total = 0;
    chores.forEach((chore) => {
      orderedDays.forEach((_, dayIndex) => {
        const count = Number(choreData[`${chore.id}-${dayIndex}`] || 0);
        total += chore.value * count;
      });
    });
    return total;
  };

  const getDayDate = (dayIndex: number) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0=Sun, 1=Mon...

    let diffFromStart = currentDay - weekStartDay;
    if (diffFromStart < 0) diffFromStart += 7;

    const mondayIndex = diffFromStart; // This is actually "index in current cycle"
    const diff = dayIndex - mondayIndex;
    const date = new Date(today);
    date.setDate(today.getDate() + diff);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  const getDayStats = (dayIndex: number) => {
    let tasks = 0;
    let earnings = 0;
    chores.forEach((chore) => {
      const count = Number(choreData[`${chore.id}-${dayIndex}`] || 0);
      tasks += count;
      earnings += count * chore.value;
    });
    return { tasks, earnings };
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>
          <ArrowLeft size={24} />
        </BackButton>
        <IconButton
          onClick={() => {
            window.history.pushState(null, '', '/settings');
            setIsSettingsOpen(true);
          }}
        >
          <Settings size={24} />
        </IconButton>
        <Title>{household.name}</Title>
        <Subtitle>Track chores and earn your allowance!</Subtitle>
      </Header>

      <TabContainer>
        {household.members.map((child) => (
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

      <AccordionContainer>
        {orderedDays.map((day, dayIndex) => {
          const { tasks, earnings } = getDayStats(dayIndex);
          return (
            <AccordionItem key={day}>
              <AccordionHeader
                active={expandedDayIndex === dayIndex}
                onClick={() => toggleDay(dayIndex)}
              >
                <DayHeaderContent>
                  <DayTitle>{day}</DayTitle>
                  <DayDate>{getDayDate(dayIndex)}</DayDate>
                </DayHeaderContent>
                {(tasks > 0 || earnings > 0) && (
                  <DayStats>
                    <span>
                      {tasks} {tasks === 1 ? 'Task' : 'Tasks'}
                    </span>
                    <span>·</span>
                    <span>€{earnings.toFixed(2)}</span>
                  </DayStats>
                )}
                {expandedDayIndex === dayIndex ? (
                  <ChevronUp size={20} color="#7f8c8d" />
                ) : (
                  <ChevronDown size={20} color="#7f8c8d" />
                )}
              </AccordionHeader>
              {expandedDayIndex === dayIndex && (
                <AccordionContent>
                  <ChoreList>
                    {chores.map((chore) => (
                      <React.Fragment key={chore.id}>
                        {(() => {
                          const count = Number(
                            choreData[`${chore.id}-${dayIndex}`] || 0
                          );
                          return (
                            <ChoreCard
                              active={count > 0}
                              onClick={() => updateChore(chore.id, dayIndex, 1)}
                            >
                              <ChoreInfo>
                                <ChoreName>{chore.label}</ChoreName>
                                <ChoreValue>
                                  €{chore.value} · {chore.frequency} ·{' '}
                                  {chore.effort} Effort
                                </ChoreValue>
                              </ChoreInfo>
                              <ChoreCount>
                                {count > 0 && (
                                  <>
                                    <DecrementButton
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateChore(chore.id, dayIndex, -1);
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
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </AccordionContainer>

      <Footer>
        <TotalContainer>
          <Euro size={32} color="#27ae60" />
          <span>Total Earned: €{calculateTotal().toFixed(2)}</span>
        </TotalContainer>
      </Footer>

      {isSettingsOpen && (
        <SettingsPage>
          <SettingsContainer>
            <SettingsHeader>
              <SettingsTitle>Settings</SettingsTitle>
              <CloseButton
                onClick={() => {
                  window.history.pushState(null, '', '/');
                  setIsSettingsOpen(false);
                }}
              >
                <X size={24} />
              </CloseButton>
            </SettingsHeader>
            <FormGroup>
              <Label>Start of Week Cycle</Label>
              <Select
                value={weekStartDay}
                onChange={(e) => setWeekStartDay(Number(e.target.value))}
              >
                {BASE_DAYS.map((day, index) => (
                  <option key={day} value={index}>
                    {day}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <ResetButton
              onClick={resetWeek}
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <RotateCcw size={18} />
              Reset Week
            </ResetButton>
          </SettingsContainer>
        </SettingsPage>
      )}
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

  // Create Household Form State
  const [newHouseholdName, setNewHouseholdName] = useState('');
  const [newMembers, setNewMembers] = useState<string[]>(['']);
  const [newWeekStart, setNewWeekStart] = useState(1);

  useEffect(() => {
    const fetchHouseholds = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'households'));
        const loadedHouseholds: Household[] = [];
        querySnapshot.forEach((doc) => {
          // Simple validation/casting
          const data = doc.data() as Omit<Household, 'id'>;
          loadedHouseholds.push({ id: doc.id, ...data });
        });
        setHouseholds(loadedHouseholds);

        // Auto-select if saved in local storage
        const savedId = localStorage.getItem('payDayPal_selectedHouseholdId');
        if (savedId) {
          const found = loadedHouseholds.find((h) => h.id === savedId);
          if (found) {
            setCurrentHousehold(found);
            setView('app');
          }
        }
      } catch (error) {
        console.error('Error loading households:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHouseholds();
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
      settings: { weekStartDay: newWeekStart },
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
        <FormGroup>
          <Label>Start of Week</Label>
          <Select
            value={newWeekStart}
            onChange={(e) => setNewWeekStart(Number(e.target.value))}
          >
            {BASE_DAYS.map((day, index) => (
              <option key={day} value={index}>
                {day}
              </option>
            ))}
          </Select>
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
