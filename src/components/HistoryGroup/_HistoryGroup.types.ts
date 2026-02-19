import type { ActivityRecord } from "../../types";

declare module "react" {
	interface CSSProperties {
		"--member-color"?: string;
	}
}

export interface IHistoryGroup_ByMember {
	memberId: string;
	activities: ActivityRecord[];
}

export interface IHistoryGroup_ByDay {
	date: string; // string because of logic for grouping by date in HistoryScreen
	activities: ActivityRecord[];
}
