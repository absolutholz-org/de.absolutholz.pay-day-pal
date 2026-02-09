import { type HouseholdMember } from "../../types";

export interface HistoryItemProps {
	title: string;
	emoji: string;
	amountCompleted: number;
	amountEarned: number;
	householdMember?: HouseholdMember;
}
