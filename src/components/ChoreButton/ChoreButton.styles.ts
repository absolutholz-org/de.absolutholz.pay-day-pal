import styled from "@emotion/styled";

export const ChoreCard = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid ${(props) => (props.active ? "#2ecc71" : "transparent")};
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.98);
  }
`;

export const ChoreMain = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ChoreIconWrapper = styled.div`
  padding: 0.75rem;
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
`;

export const ChoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ChoreName = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-primary);
`;

export const ChoreValue = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

export const ChoreCount = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CountBadge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2ecc71;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const DecrementButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #e74c3c;
  background: transparent;
  color: #e74c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;

  &:active {
    background: #e74c3c;
    color: white;
  }
`;
