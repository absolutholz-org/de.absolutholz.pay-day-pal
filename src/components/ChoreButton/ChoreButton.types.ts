import { Chore } from '../../types';

export interface ChoreButtonProps {
  chore: Chore;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}
