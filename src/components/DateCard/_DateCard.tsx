import * as S from "./_DateCard.styles";
import { DateCardProps } from "./_DateCard.types";
import { useLocalization } from "../../context/LocalizationContext";
import { useCurrency } from "../../hooks/useCurrency";

export function DateCard({
  date,
  isActive,
  isToday,
  dailyTotal,
  onClick,
}: DateCardProps) {
  const { t, language } = useLocalization();
  const Component = isActive ? S.DateCard_Active : S.DateCard;
  const formattedValue = useCurrency(dailyTotal, "en-DE", "EUR");

  return (
    <Component onClick={onClick}>
      <S.DateWeekday>
        {isToday ? (
          t.today
        ) : (
          <span className="long">
            {date.toLocaleDateString(language, { weekday: "long" })}
          </span>
        )}
      </S.DateWeekday>
      <S.DateDay>
        {date.toLocaleDateString(language, {
          month: "short",
          day: "numeric",
        })}
      </S.DateDay>
      <S.DateEarnings>{formattedValue}</S.DateEarnings>
    </Component>
  );
}
