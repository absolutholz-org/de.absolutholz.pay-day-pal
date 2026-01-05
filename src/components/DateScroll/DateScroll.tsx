import {
  DateCard,
  DateCardContent,
  DateWeekday,
  DateDay,
  DateEarnings,
} from '../../styles';
import { formatDateKey } from '../../utils';
import { DateScrollProps } from './DateScroll.types';
import * as S from './DateScroll.styles';

export function DateScroll({
  dates,
  selectedDate,
  onDateSelect,
  getDailyTotal,
}: DateScrollProps) {
  return (
    <S.DateScroll>
      {dates.map((date) => {
        const dateKey = formatDateKey(date);
        const isActive = selectedDate === dateKey;
        const dailyTotal = getDailyTotal(date);
        return (
          <DateCard
            key={dateKey}
            active={isActive}
            onClick={() => onDateSelect(dateKey)}
          >
            <DateCardContent>
              <DateWeekday>
                <span className="short">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="long">
                  {date.toLocaleDateString('en-US', { weekday: 'long' })}
                </span>
              </DateWeekday>
              <DateDay>
                {date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </DateDay>
              <DateEarnings>€{dailyTotal.toFixed(2)}</DateEarnings>
            </DateCardContent>
          </DateCard>
        );
      })}
    </S.DateScroll>
  );
}
