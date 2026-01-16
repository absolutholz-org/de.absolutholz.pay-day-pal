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
    <S.CardList>
      {chores.map((chore) => (
        <S.CardList_Item key={chore.id}>
          <ChoreCard
            category={chore.category}
            label={chore.labels[language]}
            value={chore.value}
            count={counts[chore.id] || 0}
            onIncrement={() => onIncrement(chore.id)}
            onDecrement={() => onDecrement(chore.id)}
          />
        </S.CardList_Item>
      ))}
    </S.CardList>
  );
}
