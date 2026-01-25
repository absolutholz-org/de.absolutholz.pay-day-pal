import { Minus, Plus } from "lucide-react";
import { CHORE_CATEGORIES } from "../../constants";
import { useCurrency } from "../../hooks/useCurrency";
import { VisuallyHidden } from "../VisuallyHidden";
import * as S from "./_ChoreCard.styles";
import { ChoreCardProps } from "./_ChoreCard.types";

export function ChoreCard({
  id,
  label,
  category,
  count,
  value,
  onIncrement,
  onDecrement,
}: ChoreCardProps) {
  const color = CHORE_CATEGORIES[category].color;
  const formattedValue = useCurrency(value, "en-DE", "EUR");
  const icon = CHORE_CATEGORIES[category].emoji;

  return (
    <S.ChoreCard
      role="group"
      aria-labelledby={id}
      data-count={count > 0 ? count : undefined}
      style={{
        "--chore-color": `var(--accent-${color})`,
      }}
    >
      <S.ChoreCard_Top>
        {/* The Icon */}
        <S.ChoreCard_TopImage>
          <S.ChoreCard_TopImage_Bubbles>
            <S.ChoreCard_TopImage_Bubble1 />
            <S.ChoreCard_TopImage_Bubble2 />
          </S.ChoreCard_TopImage_Bubbles>
          <S.ChoreCard_TopIcon>{icon}</S.ChoreCard_TopIcon>
        </S.ChoreCard_TopImage>

        {/* The Reward Badge */}
        <S.ChoreCard_TopPill>{formattedValue}</S.ChoreCard_TopPill>
      </S.ChoreCard_Top>

      {/* Bottom Section: Title and Controls */}
      <S.ChoreCard_Bottom>
        <S.ChoreCard_Title id={id}>{label}</S.ChoreCard_Title>

        <S.ChoreCard_Stepper>
          {/* Minus Button */}
          <S.ChoreCard_StepperButton_Decrement
            onClick={onDecrement}
            disabled={count === 0}
            aria-label="Decrease count"
          >
            <Minus />
          </S.ChoreCard_StepperButton_Decrement>

          {/* Current Count */}
          <S.ChoreCard_StepperValue>{count}</S.ChoreCard_StepperValue>

          {/* Plus Button */}
          <S.ChoreCard_StepperButton_Increment
            onClick={onIncrement}
            aria-label="Increase count"
          >
            <Plus />
          </S.ChoreCard_StepperButton_Increment>
        </S.ChoreCard_Stepper>
      </S.ChoreCard_Bottom>
    </S.ChoreCard>

    // <S.ChoreCard
    //   role="group"
    //   aria-labelledby={id}
    //   data-count={count > 0 ? count : undefined}
    //   style={{
    //     "--card-color": `var(--accent-${color})`,
    //     "--on-card-color": `var(--on-accent-${color})`,
    //   }}
    // >
    //   <S.ChoreCard_Head>{formattedValue}</S.ChoreCard_Head>
    //   <S.ChoreCard_Background>
    //     <S.ChoreCard_Icon>
    //       <Icon size={24} color="var(--accent)" height="80" width="80" />
    //     </S.ChoreCard_Icon>
    //     <S.ChoreCard_Title id={id}>{label}</S.ChoreCard_Title>
    //     <S.ChoreCard_Foot>
    //       <S.ChoreCard_ButtonDecrement
    //         aria-label="Decrease laundry count"
    //         onClick={onDecrement}
    //         disabled={count === 0}
    //       >
    //         <Minus size={18} />
    //       </S.ChoreCard_ButtonDecrement>
    //       <S.ChoreCard_Quantity aria-live="polite" aria-atomic="true">
    //         <VisuallyHidden>Current laundry count:</VisuallyHidden>
    //         {count}
    //       </S.ChoreCard_Quantity>
    //       <S.ChoreCard_ButtonIncrement
    //         aria-label="Increase laundry count"
    //         onClick={onIncrement}
    //       >
    //         <Plus size={18} />
    //       </S.ChoreCard_ButtonIncrement>
    //     </S.ChoreCard_Foot>
    //   </S.ChoreCard_Background>
    // </S.ChoreCard>
  );
}
