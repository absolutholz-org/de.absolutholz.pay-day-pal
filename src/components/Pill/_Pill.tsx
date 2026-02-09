import * as S from "./_Pill.styles";
import { type PillProps } from "./_Pill.types";

export const Pill: React.FC<PillProps> = ({
	children,
	// active,
	color = "firebrick",
	onClick,
	size = "medium",
	slotLead,
	slotTrail,
}) => {
	const PillVariant = {
		large: S.Pill_Large,
		medium: S.Pill_Medium,
		small: S.Pill_Small,
	}[size];

	return (
		<PillVariant
			style={{ "--on-pill-accent": "white", "--pill-accent": color }}
			onClick={onClick}
		>
			{slotLead && <S.Pill_SlotLead>{slotLead}</S.Pill_SlotLead>}
			<S.Pill_Content>{children}</S.Pill_Content>
			{slotTrail && <S.Pill_SlotTrail>{slotTrail}</S.Pill_SlotTrail>}
		</PillVariant>
	);
};
