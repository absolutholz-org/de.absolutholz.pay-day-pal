import { ChoreCategoryId } from "../../types";

declare module "react" {
  interface CSSProperties {
    "--card-color"?: string;
    "--on-card-color"?: string;
  }
}

export interface ChoreCardProps {
  category: ChoreCategoryId;
  label: string;
  value: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}
