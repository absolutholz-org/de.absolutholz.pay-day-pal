import * as S from "./_Pill.styles";
import { PillProps } from "./_Pill.types";

export const Pill: React.FC<PillProps> = ({
  children,
  slotLead,
  slotTrail,
  size = "medium",
  active,
  color = "firebrick",
  onClick,
}) => {
  const PillVariant = {
    small: S.Pill_Small,
    medium: S.Pill_Medium,
    large: S.Pill_Large,
  }[size];

  return (
    <PillVariant
      style={{ "--pill-accent": color, "--on-pill-accent": "white" }}
      onClick={onClick}
    >
      {slotLead && <S.Pill_SlotLead>{slotLead}</S.Pill_SlotLead>}
      <S.Pill_Content>{children}</S.Pill_Content>
      {slotTrail && <S.Pill_SlotTrail>{slotTrail}</S.Pill_SlotTrail>}
    </PillVariant>
  );
};
