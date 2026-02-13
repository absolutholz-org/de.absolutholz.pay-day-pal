import { useLocalization } from "../../context/LocalizationContext";
import { useCurrency } from "../../hooks/useCurrency";
import { useDateFormatter } from "../../hooks/useDateFormatter";
import { HouseholdMemberPill } from "../HouseholdMemberPill";
import * as S from "./_HistoryItem.styles";
import { type HistoryItemProps } from "./_HistoryItem.types";

export function HistoryItem({
	amountEarned,
	date,
	icon,
	member,
	title,
}: HistoryItemProps) {
	const { language } = useLocalization();
	const formattedValue = useCurrency(amountEarned, language, "EUR");
	const dateFormatter = useDateFormatter();

	return (
		<S.HistoryItem>
			<S.HistoryItem_Icon>{icon}</S.HistoryItem_Icon>
			<S.HistoryItem_Content>
				<S.HistoryItem_Title>{title}</S.HistoryItem_Title>
				<S.HistoryItem_Children>
					{member && (
						<HouseholdMemberPill
							name={member.name}
							emoji={member.emoji}
							color={member.color}
							isActive={true}
							size="small"
						/>
					)}
					{date && (
						<time dateTime={date.toISOString()}>
							<span aria-hidden="true">📅</span>{" "}
							{dateFormatter.format(date)}
						</time>
					)}
				</S.HistoryItem_Children>
			</S.HistoryItem_Content>
			<S.HistoryItem_Amount>{formattedValue}</S.HistoryItem_Amount>
		</S.HistoryItem>
	);
}
