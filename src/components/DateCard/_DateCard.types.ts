export interface DateCardProps {
  date: Date;
  isActive: boolean;
  isToday: boolean;
  dailyTotal: number;
  onClick: () => void;
}
