import type { Firestore } from "firebase/firestore";
import type {
  AccentColor,
  Currency,
  Household,
  HouseholdMember,
  Language,
  Period,
} from "../../types";

export interface Activity {
  id: string;
  date: string;
  memberId: string;
  memberName: string;
  choreLabel: string;
  value: number;
}

export interface DataContextType {
  db: Firestore;
  currentHousehold: Household | null;
  selectHousehold: (household: Household) => void;
  leaveHousehold: () => void;
  updateHouseholdName: (name: string) => Promise<void>;
  updateHouseholdLanguage: (language: Language) => Promise<void>;
  updateHouseholdCurrency: (currency: Currency) => Promise<void>;
  addMember: (name: string, emoji: string, color: AccentColor) => Promise<void>;
  toggleMemberStatus: (memberId: string) => Promise<void>;
  updateMember: (
    memberId: string,
    data: Partial<HouseholdMember>,
  ) => Promise<void>;
  finishPeriod: (startNew: boolean) => Promise<void>;
  getPastPeriods: () => Promise<Period[]>;
  getPeriodActivities: (periodId: string) => Promise<{
    period: Period;
    activities: Activity[];
  }>;
  addActivityRecord: (
    memberId: string,
    choreId: string,
    dateKey: string,
  ) => Promise<void>;
  removeActivityRecord: (
    memberId: string,
    choreId: string,
    dateKey: string,
  ) => Promise<void>;
  getRecentActivities: (limitCount?: number) => Promise<Activity[]>;
}
