import { HouseholdMemberPill } from "../HouseholdMemberPill";
import * as S from "./_HouseholdMemberSelector.styles";
import { type HouseholdMemberSelectorProps } from "./_HouseholdMemberSelector.types";

export function HouseholdMemberSelector({
	members,
	activeMemberId,
	onSelectMember,
}: HouseholdMemberSelectorProps) {
	return (
		<S.HouseholdMemberSelector>
			{members
				.filter((m) => !m.disabled)
				.map((member) => (
					<HouseholdMemberPill
						key={member.id}
						name={member.name}
						emoji={member.emoji}
						color={member.color}
						isActive={activeMemberId === member.id}
						onClick={() => onSelectMember(member.id)}
					/>
				))}
		</S.HouseholdMemberSelector>
	);
}
