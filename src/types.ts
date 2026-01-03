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
  category:
    | 'bedroom'
    | 'living-room'
    | 'kitchen'
    | 'bathroom'
    | 'outside'
    | 'laundry';
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
