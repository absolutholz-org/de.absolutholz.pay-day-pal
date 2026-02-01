import { useCurrency } from "../../hooks/useCurrency";
import { HistoryItem } from "../HistoryItem";
import * as S from "./_HistoryGroup.styles";
import { HistoryGroupProps } from "./_HistoryGroup.types";

export function HistoryGroup({
  title,
  subTitle,
  amountEarned,
  items,
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
        {items.map(({ id, name, emoji }) => (
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
