import styled from "@emotion/styled";

export const ToggleContainer = styled.div`
  background: var(--surface-2);
  border-radius: 8px;
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? "var(--surface)" : "transparent")};
  align-items: center;
  border: none;
  border-radius: 6px;
  box-shadow: ${(props) =>
    props.active ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
  color: ${(props) =>
    props.active ? "var(--on-surface)" : "var(--on-surface-2)"};
  cursor: pointer;
  display: flex;
  flex: 1;
  font-weight: 600;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem;
  transition: all 0.2s;

  &:hover {
    color: var(--on-surface);
  }
`;
