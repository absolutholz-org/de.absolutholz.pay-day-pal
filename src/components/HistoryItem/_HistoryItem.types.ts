import { type ReactNode } from "react";

import { type HouseholdMember } from "../../types";

export interface IHistoryItem {
	title: string;
	icon?: string;
	amountEarned?: number;
	date?: Date;
	member?: HouseholdMember;
	children?: ReactNode; // temporary
	onClick?: () => void; // temporary
}
