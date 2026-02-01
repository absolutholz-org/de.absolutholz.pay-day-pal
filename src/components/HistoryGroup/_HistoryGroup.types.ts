import type { HouseholdMember } from "../../types";

export interface HistoryGroupProps {
  emoji?: string;
  title: string;
  subTitle: string;
  amountEarned: number;
  items: HouseholdMember[];
}
