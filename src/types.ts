export type Language = "en" | "de" | "fr" | "pt";
export type Currency = "USD" | "EUR";

export const ACCENT_COLORS = [
  "blue",
  "green",
  "purple",
  "orange",
  "red",
  "yellow",
  "pink",
  "indigo",
] as const;

export type AccentColor = (typeof ACCENT_COLORS)[number];

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
  color: AccentColor;
  icon: React.ElementType;
  emoji: string;
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

export type ActivityRecord = {
  id: string;
  choreId: string;
  memberId: string;
  date: string;
  createdAt: Date;
  value: number;
  choreLabel: string;
};

export type HouseholdMember = {
  id: string;
  name: string;
  disabled?: boolean;
  color: AccentColor;
  emoji: string;
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
