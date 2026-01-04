export type Member = {
  id: string;
  name: string;
  disabled?: boolean;
};

export type Chore = {
  id: string;
  label?: string;
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
  periodStart: string; // YYYY-MM-DD
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
  startDate: string;
  endDate: string;
  createdAt: any;
};
