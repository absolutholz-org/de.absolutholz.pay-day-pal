export interface DateScrollProps {
  dates: Date[];
  selectedDate: string;
  onDateSelect: (dateKey: string) => void;
  getDailyTotal: (date: Date) => number;
}
