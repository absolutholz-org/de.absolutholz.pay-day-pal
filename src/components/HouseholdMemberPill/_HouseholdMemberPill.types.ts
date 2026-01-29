declare module "react" {
  interface CSSProperties {
    "--member-color"?: string;
  }
}

export type HouseholdMemberPillSize = "small" | "large";

export interface HouseholdMemberPillProps {
  name: string;
  emoji?: string;
  color: string;
  isActive?: boolean;
  onClick?: () => void;
  size?: HouseholdMemberPillSize;
}
