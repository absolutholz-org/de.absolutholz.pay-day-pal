import * as S from "./_HouseholdMemberPill.styles";
import { type HouseholdMemberPillProps } from "./_HouseholdMemberPill.types";

export function HouseholdMemberPill({
	name,
	emoji,
	color,
	isActive = false,
	onClick,
	size = "large",
}: HouseholdMemberPillProps) {
	return (
		<S.Pill
			isActive={isActive}
			onClick={onClick}
			style={{ "--member-color": `var(--accent-${color})` }}
			size={size}
		>
			{emoji && (
				<S.Icon isActive={isActive} size={size}>
					{emoji}
				</S.Icon>
			)}
			{name}
		</S.Pill>
	);
}
