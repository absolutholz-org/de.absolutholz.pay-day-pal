import * as S from "./_HouseholdMemberSelector.styles";
import { HouseholdMemberSelectorProps } from "./_HouseholdMemberSelector.types";

export function HouseholdMemberSelector({
  members,
  // activeMemberId,
  onSelectMember,
}: HouseholdMemberSelectorProps) {
  return (
    <S.HouseholdMemberSelector>
      {members
        .filter((m) => !m.disabled)
        .map((member) => (
          <S.HouseholdMemberSelector_Member
            key={member.id}
            onClick={() => onSelectMember(member.id)}
            style={{ "--member-color": member.color } as any}
          >
            {member.emoji && (
              <S.HouseholdMemberSelector_MemberIcon>
                {member.emoji}
              </S.HouseholdMemberSelector_MemberIcon>
            )}
            {member.name}
          </S.HouseholdMemberSelector_Member>
        ))}
    </S.HouseholdMemberSelector>
  );
}
