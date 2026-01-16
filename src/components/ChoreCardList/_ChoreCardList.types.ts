import { Chore, Language } from "../../types";

export interface ChoreCardListProps {
  chores: Chore[];
  counts: Record<string, number>;
  onIncrement: (choreId: string) => void;
  onDecrement: (choreId: string) => void;
  language?: Language;
}
