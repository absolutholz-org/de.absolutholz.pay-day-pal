import { ChoreCard } from "../ChoreCard";
import * as S from "./_ChoreCardList.styles";
import { ChoreCardListProps } from "./_ChoreCardList.types";

export function ChoreCardList({
  chores,
  counts,
  onIncrement,
  onDecrement,
  language = "en",
}: ChoreCardListProps) {
  return (
    <S.ChoreCardList role="list">
      {chores.map((chore) => (
        <S.ChoreCardList_Item key={chore.id}>
          <ChoreCard
            id={chore.id}
            category={chore.category}
            label={chore.labels[language]}
            value={chore.value}
            count={counts[chore.id] || 0}
            onIncrement={() => onIncrement(chore.id)}
            onDecrement={() => onDecrement(chore.id)}
          />
        </S.ChoreCardList_Item>
      ))}
    </S.ChoreCardList>
  );
}
