import styled from "@emotion/styled";

export const HouseholdMemberSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const HouseholdMemberSelector_Member = styled.button<{
  active: boolean;
}>`
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "oklch(63.7% 0.152 253.7)" : "oklch(94.6% 0.008 218.4)"};
  color: ${(props) => (props.active ? "white" : "oklch(60.6% 0.016 218.4)")};
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background-color: ${(props) =>
      props.active ? "oklch(54.8% 0.152 253.7)" : "oklch(81.6% 0.012 218.4)"};
  }
`;
