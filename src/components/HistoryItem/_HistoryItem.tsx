import { useCurrency } from "../../hooks/useCurrency";
import * as S from "./_HistoryItem.styles";
import { HistoryItemProps } from "./_HistoryItem.types";

export function HistoryItem({
  title,
  emoji,
  amountCompleted,
  amountEarned,
}: HistoryItemProps) {
  const formattedValue = useCurrency(amountEarned, "en-DE", "EUR");

  return (
    <S.ActivityItem>
      <S.LeftSide>
        <S.IconWrapper role="img" aria-label={title}>
          {emoji}
        </S.IconWrapper>
        <S.DetailsWrapper>
          <S.ItemName>{title}</S.ItemName>
          <S.MetaRow>
            {/* <S.UserBadge userType={item.user}>
                        <span role="img" aria-label={item.user}>{item.userIcon}</span>
                        <span>{item.user}</span>
                      </S.UserBadge> */}
            {/* <span>× {item.multiplier}</span> */}
            <div>{amountCompleted} completed</div>
          </S.MetaRow>
        </S.DetailsWrapper>
      </S.LeftSide>

      <S.ItemPrice>{formattedValue}</S.ItemPrice>
    </S.ActivityItem>
  );
}
