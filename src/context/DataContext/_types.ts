import type { Firestore } from "firebase/firestore";

import type {
	AccentColor,
	ActivityRecord,
	Currency,
	Household,
	HouseholdMember,
	Language,
	Period,
} from "../../types";

export interface DataContextType {
	db: Firestore;
	currentHousehold: Household | null;
	selectHousehold: (household: Household) => void;
	leaveHousehold: () => void;
	updateHouseholdName: (name: string) => Promise<void>;
	updateHouseholdLanguage: (language: Language) => Promise<void>;
	updateHouseholdCurrency: (currency: Currency) => Promise<void>;
	addMember: (
		name: string,
		emoji: string,
		color: AccentColor,
	) => Promise<void>;
	toggleMemberStatus: (memberId: string) => Promise<void>;
	updateMember: (
		memberId: string,
		data: Partial<HouseholdMember>,
	) => Promise<void>;
	finishPeriod: (startNew: boolean) => Promise<void>;
	getPastPeriods: () => Promise<Period[]>;
	getPeriodActivities: (periodId: string) => Promise<{
		period: Period;
		activities: ActivityRecord[];
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
	getRecentActivities: (limitCount?: number) => Promise<ActivityRecord[]>;
}
