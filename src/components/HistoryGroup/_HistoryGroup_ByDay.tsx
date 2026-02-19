import { useCurrency } from "../../hooks/useCurrency";
import { type ActivityRecord } from "../../types";
import { HistoryItemList } from "../HistoryItemList";
import { HistoryItemWithMember } from "../HistoryItemWithMember";
import * as S from "./_HistoryGroup.styles";
import { type IHistoryGroup_ByDay } from "./_HistoryGroup.types";

export function HistoryGroup_ByDay({ activities, date }: IHistoryGroup_ByDay) {
	const activityCount = activities.length;
	const formattedTotalEarned = useCurrency(
		activities.reduce(
			(sum: number, activity: ActivityRecord) => sum + activity.value,
			0,
		),
	);

	return (
		<S.HistoryGroup>
			<S.HistoryGroupHeader_Day>
				<S.HistoryGroupHeader_Main>
					<S.HistoryGroupHeader_Title>
						{date}
					</S.HistoryGroupHeader_Title>
					<S.HistoryGroupHeader_Subtitle>
						{activityCount} activities
					</S.HistoryGroupHeader_Subtitle>
				</S.HistoryGroupHeader_Main>
				<S.HistoryGroupHeader_Amount>
					{formattedTotalEarned}
				</S.HistoryGroupHeader_Amount>
			</S.HistoryGroupHeader_Day>

			<S.HistoryGroup_Content>
				<HistoryItemList>
					{activities.map(({ choreId, id, memberId, value }) => (
						<HistoryItemWithMember
							key={id}
							amountEarned={value}
							choreId={choreId}
							memberId={memberId}
						/>
					))}
				</HistoryItemList>
			</S.HistoryGroup_Content>
		</S.HistoryGroup>
	);
}
