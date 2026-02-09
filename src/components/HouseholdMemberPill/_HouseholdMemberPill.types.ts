import { type AccentColor } from "../../types";

declare module "react" {
	interface CSSProperties {
		"--member-color"?: string;
	}
}

export type HouseholdMemberPillSize = "small" | "large";

export interface HouseholdMemberPillProps {
	name: string;
	emoji?: string;
	color: AccentColor;
	isActive?: boolean;
	onClick?: () => void;
	size?: HouseholdMemberPillSize;
}
