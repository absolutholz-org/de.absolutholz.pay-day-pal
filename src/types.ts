import { Timestamp } from 'firebase/firestore';

export type Member = {
  id: string;
  name: string;
  disabled?: boolean;
};

export type Chore = {
  id: string;
  labels?: { [key: string]: string };
  value: number;
  frequency: string;
  effort: 'Low' | 'Medium' | 'High';
  category:
    | 'bedroom'
    | 'living-room'
    | 'kitchen'
    | 'bathroom'
    | 'outside'
    | 'laundry'
    | 'household';
};

export type HouseholdSettings = {
  // Settings are currently empty as period management moved to subcollection
};

export type Household = {
  id: string;
  name: string;
  members: Member[];
  chores: Chore[];
  settings: HouseholdSettings;
};

export type Period = {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string | null; // YYYY-MM-DD
  createdAt: Timestamp;
};
