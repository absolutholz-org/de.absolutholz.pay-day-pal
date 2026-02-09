import { useLocalization } from "../../context/LocalizationContext";
import { useCurrency } from "../../hooks/useCurrency";
import * as S from "./_DateCard.styles";
import { type DateCardProps } from "./_DateCard.types";

export function DateCard({
	dailyTotal,
	date,
	isActive,
	isToday,
	onClick,
}: DateCardProps) {
	const { language, t } = useLocalization();
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
					day: "numeric",
					month: "short",
				})}
			</S.DateDay>
			<S.DateEarnings>{formattedValue}</S.DateEarnings>
		</Component>
	);
}
