import { ChoreCategoryId } from "../../types";

declare module "react" {
  interface CSSProperties {
    "--chore-color"?: string;
  }
}

export interface ChoreCardProps {
  id: string;
  category: ChoreCategoryId;
  label: string;
  value: number;
  count: number;
}
