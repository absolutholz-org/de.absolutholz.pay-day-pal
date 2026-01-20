import { ReactNode } from "react";

declare module "react" {
  interface CSSProperties {
    "--pill-accent"?: string;
    "--on-pill-accent"?: string;
  }
}

export type PillSize = "small" | "medium" | "large";

export interface PillProps {
  children: ReactNode;
  slotLead?: ReactNode;
  slotTrail?: ReactNode;
  size?: PillSize;
  active?: boolean;
  color?: string;
  onClick?: () => void;
}
