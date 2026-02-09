import { type Chore, type ChoreData } from "../../types";
import { ChoreCard } from "../ChoreCard";
import * as S from "./_ChoreCardList.styles";

export interface ChoreCardListProps {
	chores: Chore[];
	counts: ChoreData;
	language?: string;
	currentActivityDate: string;
	currentMemberId: string;
}

export function ChoreCardList({
	chores,
	counts,
	currentActivityDate,
	currentMemberId,
	language = "en",
}: ChoreCardListProps) {
	return (
		<S.ChoreCardList role="list">
			{chores.map((chore) => {
				const choreCount = Number(
					counts[`${currentActivityDate}_${chore.id}`] || 0,
				);
				return (
					<S.ChoreCardList_Item key={chore.id}>
						<ChoreCard
							id={chore.id}
							category={chore.category}
							label={
								chore.labels[
									language as keyof typeof chore.labels
								]
							}
							value={chore.value}
							count={choreCount}
							currentMemberId={currentMemberId}
							currentActivityDate={currentActivityDate}
						/>
					</S.ChoreCardList_Item>
				);
			})}
		</S.ChoreCardList>
	);
}
