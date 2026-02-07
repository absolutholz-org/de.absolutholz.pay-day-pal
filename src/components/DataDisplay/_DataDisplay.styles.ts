import styled from "@emotion/styled";

export const DataDisplay = styled.div`
  align-items: baseline;
  display: flex;
  gap: 0.5rem;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const DataDisplay_Label = styled.span`
  color: var(--on-surface-3);
  font-size: 0.875rem;
  font-weight: 500;
`;

export const DataDisplay_Icon = styled.span`
  color: var(--on-surface-2);
  font-size: 1.25rem;
`;

export const DataDisplay_Data = styled.span`
  color: var(--on-surface-2);
  font-size: 1rem;
  font-weight: 600;
`;
