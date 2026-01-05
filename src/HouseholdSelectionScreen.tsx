import { addDoc, collection, Firestore, onSnapshot } from 'firebase/firestore';
import { ArrowLeft, Loader, Plus, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DEFAULT_CHORES } from './constants';
import {
  FormGroup,
  IconButton,
  Input,
  Label,
  ResetButton,
} from './SharedComponents';
import {
  BackButton,
  Card,
  CardMeta,
  CardTitle,
  Container,
  Header,
  LoadingIndicator,
  Subtitle,
  Title,
} from './styles';
import { Household } from './types';
import { formatDateKey } from './utils';

export default function HouseholdSelectionScreen({
  onSelectHousehold,
  db,
}: {
  onSelectHousehold: (household: Household) => void;
  db: Firestore;
}) {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [households, setHouseholds] = useState<Household[]>([]);
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

          // Auto-select if saved in local storage
          const savedId = localStorage.getItem('payDayPal_selectedHouseholdId');
          if (savedId) {
            const found = loadedHouseholds.find((h) => h.id === savedId);
            if (found) {
              onSelectHousehold(found);
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
  }, [db, onSelectHousehold]);

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
      settings: {},
    };

    try {
      const docRef = await addDoc(collection(db, 'households'), newHousehold);
      const created = { id: docRef.id, ...newHousehold };

      // Create initial period
      await addDoc(collection(db, 'households', docRef.id, 'periods'), {
        startDate: formatDateKey(new Date()),
        endDate: null,
        createdAt: new Date(),
      });

      onSelectHousehold(created);
    } catch (error) {
      console.error('Error creating household:', error);
      alert('Failed to create household');
    }
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
        <Title>The Pay-Day Pal</Title>
        <Subtitle>
          Manage chores, track allowances, and teach financial responsibility.
        </Subtitle>
      </Header>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3rem',
        }}
      >
        <ResetButton
          onClick={() => setView('create')}
          style={{ background: '#3498db' }}
        >
          <Plus size={18} /> Create New Household
        </ResetButton>
      </div>

      {households.length > 0 && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {households.map((h) => (
            <Card key={h.id} onClick={() => onSelectHousehold(h)}>
              <CardTitle>{h.name}</CardTitle>
              <CardMeta>
                <Users size={16} /> {h.members.length} Members
              </CardMeta>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
