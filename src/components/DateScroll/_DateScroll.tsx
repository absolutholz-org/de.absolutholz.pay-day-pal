import { formatDateKey } from "../../utils";
import { DateScrollProps } from "./_DateScroll.types";
import * as S from "./_DateScroll.styles";

export function DateScroll({
  dates,
  selectedDate,
  onDateSelect,
  getDailyTotal,
}: DateScrollProps) {
  const todayKey = formatDateKey(new Date());

  return (
    <S.DateScrollContainer>
      <S.DateScroll>
        {dates.map((date) => {
          const dateKey = formatDateKey(date);
          const isActive = selectedDate === dateKey;
          const isToday = dateKey === todayKey;
          const dailyTotal = getDailyTotal(date);
          return (
            <S.DateCard
              key={dateKey}
              active={isActive}
              isToday={isToday}
              onClick={() => onDateSelect(dateKey)}
            >
              <S.DateCardContent>
                <S.DateWeekday isToday={isToday}>
                  {isToday ? (
                    "Today"
                  ) : (
                    <>
                      <span className="short">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span className="long">
                        {date.toLocaleDateString("en-US", { weekday: "long" })}
                      </span>
                    </>
                  )}
                </S.DateWeekday>
                <S.DateDay isToday={isToday}>
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </S.DateDay>
                <S.DateEarnings>€{dailyTotal.toFixed(2)}</S.DateEarnings>
              </S.DateCardContent>
            </S.DateCard>
          );
        })}
      </S.DateScroll>
    </S.DateScrollContainer>
  );
}
