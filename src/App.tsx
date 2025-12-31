import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  RotateCcw,
  Euro,
  Minus,
  ChevronDown,
  ChevronUp,
  Settings,
  X,
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
const CHORES = [
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

const CHILDREN = [
  { id: 'dominic', name: 'Dominic' },
  { id: 'veronica', name: 'Verônica' },
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

const SettingsButton = styled.button`
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

type ChoreData = {
  [key: string]: number;
};

function App() {
  const [choreData, setChoreData] = useState<ChoreData>({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(
    () => window.location.pathname === '/settings'
  );
  const [activeChild, setActiveChild] = useState(() => {
    const saved = localStorage.getItem('payDayPal_activeChild');
    if (saved && CHILDREN.some((c) => c.id === saved)) {
      return saved;
    }
    return CHILDREN[0].id;
  });
  const [weekStartDay, setWeekStartDay] = useState(() => {
    const saved = localStorage.getItem('payDayPal_weekStartDay');
    if (saved !== null) {
      return parseInt(saved, 10);
    }
    return 1; // Default to Monday
  });
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

  // Sync settings to Local Storage and Firebase
  useEffect(() => {
    localStorage.setItem('payDayPal_activeChild', activeChild);
    localStorage.setItem('payDayPal_weekStartDay', String(weekStartDay));
    debugger;
    const syncToFirebase = async () => {
      try {
        const configRef = doc(db, 'households', 'config');
        await setDoc(configRef, { activeChild, weekStartDay }, { merge: true });
      } catch (error) {
        console.error('Error syncing settings to Firebase:', error);
      }
    };
    syncToFirebase();
  }, [activeChild, weekStartDay]);

  // Listen for external activeChild changes
  useEffect(() => {
    const configRef = doc(db, 'households', 'config');
    const unsubscribe = onSnapshot(configRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (
          data.activeChild &&
          CHILDREN.some((c) => c.id === data.activeChild)
        ) {
          setActiveChild((prev) =>
            prev !== data.activeChild ? data.activeChild : prev
          );
        }
        if (typeof data.weekStartDay === 'number') {
          setWeekStartDay((prev) =>
            prev !== data.weekStartDay ? data.weekStartDay : prev
          );
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, 'households', activeChild);
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
  }, [activeChild]);

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
      const docRef = doc(db, 'households', activeChild);
      await updateDoc(docRef, { [key]: newVal });
    } catch (error) {
      console.error('Error updating chore:', error);
    }
  };

  const resetWeek = async () => {
    const childName = CHILDREN.find((c) => c.id === activeChild)?.name;
    if (
      window.confirm(
        `Are you sure you want to reset the week for ${childName}?`
      )
    ) {
      setChoreData({});
      try {
        const docRef = doc(db, 'households', activeChild);
        await setDoc(docRef, {});
      } catch (error) {
        console.error('Error resetting week:', error);
      }
    }
  };

  const calculateTotal = () => {
    let total = 0;
    CHORES.forEach((chore) => {
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
    CHORES.forEach((chore) => {
      const count = Number(choreData[`${chore.id}-${dayIndex}`] || 0);
      tasks += count;
      earnings += count * chore.value;
    });
    return { tasks, earnings };
  };

  return (
    <Container>
      <Header>
        <SettingsButton
          onClick={() => {
            window.history.pushState(null, '', '/settings');
            setIsSettingsOpen(true);
          }}
        >
          <Settings size={24} />
        </SettingsButton>
        <Title>The Pay-Day Pal</Title>
        <Subtitle>Track chores and earn your allowance!</Subtitle>
      </Header>

      <TabContainer>
        {CHILDREN.map((child) => (
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
                    {CHORES.map((chore) => (
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

export default App;
