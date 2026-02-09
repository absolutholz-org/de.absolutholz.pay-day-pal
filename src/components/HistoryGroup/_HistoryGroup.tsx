import { useCurrency } from "../../hooks/useCurrency";
import { HistoryItem } from "../HistoryItem";
import * as S from "./_HistoryGroup.styles";
import { type HistoryGroupProps } from "./_HistoryGroup.types";

export function HistoryGroup({
	amountEarned,
	items,
	subTitle,
	title,
}: HistoryGroupProps) {
	const formattedValue = useCurrency(amountEarned, "en-DE", "EUR");

	return (
		<S.HistoryGroup open>
			<S.HistoryGroup_Summary>
				<S.HistoryGroup_HeaderMain>
					<S.HistoryGroup_Title>{title}</S.HistoryGroup_Title>
					<S.HistoryGroup_ActivityCount>
						{subTitle}
					</S.HistoryGroup_ActivityCount>
				</S.HistoryGroup_HeaderMain>
				<S.HistoryGroup_TotalAmount>
					{formattedValue}
				</S.HistoryGroup_TotalAmount>
			</S.HistoryGroup_Summary>
			<S.HistoryGroup_List role="list">
				{items.map(({ emoji, id, name }) => (
					<S.HistoryGroup_ListItem key={id}>
						<HistoryItem
							title={name}
							emoji={emoji}
							amountCompleted={0}
							amountEarned={0}
						/>
					</S.HistoryGroup_ListItem>
				))}
			</S.HistoryGroup_List>
		</S.HistoryGroup>
	);
}
