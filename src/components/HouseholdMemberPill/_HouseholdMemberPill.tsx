import * as S from "./_HouseholdMemberPill.styles";
import { type HouseholdMemberPillProps } from "./_HouseholdMemberPill.types";

export function HouseholdMemberPill({
	color,
	emoji,
	isActive = false,
	name,
	onClick,
	size = "large",
}: HouseholdMemberPillProps) {
	return (
		<S.Pill
			as={onClick ? "button" : "span"}
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
