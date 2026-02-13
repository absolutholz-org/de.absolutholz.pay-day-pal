import type { ActivityRecord, HouseholdMember } from "../../types";

declare module "react" {
	interface CSSProperties {
		"--member-color"?: string;
	}
}

export interface HistoryGroup_ByMemberProps {
	member: HouseholdMember;
	items: ActivityRecord[];
}

export interface HistoryGroup_ByDayProps {
	items: ActivityRecord[];
}
