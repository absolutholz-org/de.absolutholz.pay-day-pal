import * as S from "./_DateCard.styles";
import { DateCardProps } from "./_DateCard.types";

export function DateCard({
  date,
  isActive,
  isToday,
  dailyTotal,
  onClick,
}: DateCardProps) {
  return (
    <S.DateCard active={isActive} isToday={isToday} onClick={onClick}>
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
}
