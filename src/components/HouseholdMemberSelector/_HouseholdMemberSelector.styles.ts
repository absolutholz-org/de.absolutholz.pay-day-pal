import styled from "@emotion/styled";

export const HouseholdMemberSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const HouseholdMemberSelector_Member = styled.button`
  align-items: center;
  background-color: var(--surface-2);
  border: 2px solid var(--member-color);
  border-radius: var(--radius-pill);
  color: var(--member-color);
  display: flex;
  font-size: 1rem;
  font-weight: 600;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
  }
`;

export const HouseholdMemberSelector_MemberIcon = styled.span`
  align-items: center;
  background-color: var(--member-color);
  border-radius: var(--radius-pill);
  display: inline-flex;
  font-size: 1.125rem;
  height: 2rem;
  justify-content: center;
  margin-left: -0.5rem;
  width: 2rem;
`;
