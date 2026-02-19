import { useCurrency } from "../../hooks/useCurrency";
import { useMember } from "../../hooks/useMember";
import { type ActivityRecord } from "../../types";
import { HistoryItemList } from "../HistoryItemList";
import { HistoryItemWithMember } from "../HistoryItemWithMember";
import * as S from "./_HistoryGroup.styles";
import { type IHistoryGroup_ByMember } from "./_HistoryGroup.types";

export function HistoryGroup_ByMember({
	activities,
	memberId,
}: IHistoryGroup_ByMember) {
	const member = useMember(memberId);
	const activityCount = activities.length;
	const formattedTotalEarned = useCurrency(
		activities.reduce(
			(sum: number, activity: ActivityRecord) => sum + activity.value,
			0,
		),
	);

	if (!member) return null;

	return (
		<S.HistoryGroup>
			<S.HistoryGroupHeader_Member
				style={{
					"--member-color": `var(--accent-${member.color})`,
				}}
			>
				<S.HistoryGroupHeader_Icon>
					{member.emoji}
				</S.HistoryGroupHeader_Icon>
				<S.HistoryGroupHeader_Main>
					<S.HistoryGroupHeader_Title>
						{member.name}
					</S.HistoryGroupHeader_Title>
					<S.HistoryGroupHeader_Subtitle>
						{activityCount} chores
					</S.HistoryGroupHeader_Subtitle>
				</S.HistoryGroupHeader_Main>
				<S.HistoryGroupHeader_Amount>
					{formattedTotalEarned}
				</S.HistoryGroupHeader_Amount>
			</S.HistoryGroupHeader_Member>

			<S.HistoryGroup_Content>
				<HistoryItemList>
					{activities.map(({ choreId, date, id, value }) => (
						<HistoryItemWithMember
							key={id}
							date={date}
							amountEarned={value}
							choreId={choreId}
						/>
					))}
				</HistoryItemList>
			</S.HistoryGroup_Content>
		</S.HistoryGroup>
	);
}
