import styled from "@emotion/styled";

export const ToggleContainer = styled.div`
  display: flex;
  background: #ecf0f1;
  padding: 0.25rem;
  border-radius: 8px;
  gap: 0.25rem;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: ${(props) => (props.active ? "white" : "transparent")};
  color: ${(props) => (props.active ? "#2c3e50" : "#7f8c8d")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${(props) =>
    props.active ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};

  &:hover {
    color: #2c3e50;
  }
`;
