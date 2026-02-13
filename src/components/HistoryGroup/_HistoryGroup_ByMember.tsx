import { useCurrency } from "../../hooks/useCurrency";
// import { HistoryItem } from "../HistoryItem";
import * as S from "./_HistoryGroup.styles";
import { type HistoryGroup_ByMemberProps } from "./_HistoryGroup.types";

export function HistoryGroup_ByMember({
	items,
	member,
}: HistoryGroup_ByMemberProps) {
	const choreCount = items.length;
	const totalEarned = useCurrency(
		items.reduce((sum, item) => sum + item.value, 0),
	);

	return (
		<S.HistoryCard>
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
						{choreCount} activity types
					</S.HistoryGroupHeader_Subtitle>
				</S.HistoryGroupHeader_Main>
				<S.HistoryGroupHeader_Amount>
					{totalEarned}
				</S.HistoryGroupHeader_Amount>
			</S.HistoryGroupHeader_Member>
			<div>
				{/* {items.map((item, idx) => (
					<HistoryItem />
				))} */}
			</div>
		</S.HistoryCard>
	);
}
