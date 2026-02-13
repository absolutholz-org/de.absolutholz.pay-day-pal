import { type HouseholdMember } from "../../types";

export interface HistoryItemProps {
	title: string;
	icon: string;
	amountEarned: number;
	date?: Date;
	member?: HouseholdMember;
}
