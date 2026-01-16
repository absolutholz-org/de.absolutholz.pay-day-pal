import { Minus, Plus } from "lucide-react";
import { CHORE_CATEGORIES } from "../../constants";
import { useCurrency } from "../../hooks/useCurrency";
import { VisuallyHidden } from "../VisuallyHidden";
import * as S from "./_ChoreCard.styles";
import { ChoreCardProps } from "./_ChoreCard.types";

export function ChoreCard({
  label,
  category,
  count,
  value,
  onIncrement,
  onDecrement,
}: ChoreCardProps) {
  const color = CHORE_CATEGORIES[category].color;
  const formattedValue = useCurrency(value, "en-DE", "EUR");
  const id = `chore-title-${label}`;
  const Icon: React.ElementType = CHORE_CATEGORIES[category].icon;

  return (
    <S.ChoreCard
      role="group"
      aria-labelledby={id}
      data-count={count > 0 ? count : undefined}
      style={{
        "--card-color": `var(--accent-${color})`,
        "--on-card-color": `var(--on-accent-${color})`,
      }}
    >
      <S.ChoreCard_Head>{formattedValue}</S.ChoreCard_Head>
      <S.ChoreCard_Background>
        <S.ChoreCard_Icon>
          <Icon size={24} color="var(--accent)" height="80" width="80" />
        </S.ChoreCard_Icon>
        <S.ChoreCard_Title id={id}>{label}</S.ChoreCard_Title>
        <S.ChoreCard_Foot>
          <S.ChoreCard_ButtonDecrement
            aria-label="Decrease laundry count"
            onClick={onDecrement}
            disabled={count === 0}
          >
            <Minus size={18} />
          </S.ChoreCard_ButtonDecrement>
          <S.ChoreCard_Quantity aria-live="polite" aria-atomic="true">
            <VisuallyHidden>Current laundry count:</VisuallyHidden>
            {count}
          </S.ChoreCard_Quantity>
          <S.ChoreCard_ButtonIncrement
            aria-label="Increase laundry count"
            onClick={onIncrement}
          >
            <Plus size={18} />
          </S.ChoreCard_ButtonIncrement>
        </S.ChoreCard_Foot>
      </S.ChoreCard_Background>
    </S.ChoreCard>
  );
}
