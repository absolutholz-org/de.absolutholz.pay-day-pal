import { useCurrency } from "../../hooks/useCurrency";
// import { HistoryItem } from "../HistoryItem";
import * as S from "./_HistoryGroup.styles";
import { type HistoryGroup_ByDayProps } from "./_HistoryGroup.types";

export function HistoryGroup_ByDay({ items }: HistoryGroup_ByDayProps) {
	const date = items[0]?.date;
	const choreCount = items.length;
	const totalEarned = useCurrency(
		items.reduce((sum, item) => sum + item.value, 0),
	);

	return (
		<S.HistoryCard>
			<S.HistoryGroupHeader_Day>
				<S.HistoryGroupHeader_Main>
					<S.HistoryGroupHeader_Title>
						{date}
					</S.HistoryGroupHeader_Title>
					<S.HistoryGroupHeader_Subtitle>
						{choreCount} chores
					</S.HistoryGroupHeader_Subtitle>
				</S.HistoryGroupHeader_Main>
				<S.HistoryGroupHeader_Amount>
					{totalEarned}
				</S.HistoryGroupHeader_Amount>
			</S.HistoryGroupHeader_Day>
			<div>
				{/* {items.map((item, idx) => (
					<HistoryItem />
				))} */}
			</div>
		</S.HistoryCard>
	);
}
