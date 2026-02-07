import { ReactNode } from "react";

export interface DataDisplayProps {
  label: string;
  icon?: ReactNode;
  data: string;
  onEdit?: () => void;
  editLabel?: string;
}
