export type Language = "en" | "de" | "fr" | "pt";
export type Currency = "USD" | "EUR";

export type ChoreCategoryId =
  | "bedroom"
  | "living-room"
  | "kitchen"
  | "bathroom"
  | "outside"
  | "laundry"
  | "household";

export type ChoreCategoryIcon =
  | "Bed"
  | "Sofa"
  | "Utensils"
  | "Toilet"
  | "Tree"
  | "Shirt"
  | "House";

export type ChoreCategory = {
  id: ChoreCategoryId;
  labels: Record<Language, string>;
  color: string;
  icon: React.ElementType;
};

export type Chore = {
  id: string;
  labels: Record<Language, string>;
  value: number;
  frequency: string;
  effort: "low" | "medium" | "high";
  category: ChoreCategoryId;
  disabled?: boolean;
};

export type ChoreData = {
  [key: string]: number;
};

export type HouseholdMember = {
  id: string;
  name: string;
  disabled?: boolean;
};

export type Household = {
  id: string;
  name: string;
  members: HouseholdMember[];
  chores: Chore[];
  currency: Currency;
  language: Language;
};

export type Period = {
  id: string;
  startDate: Date;
  endDate?: Date | null;
  createdAt: Date;
};
