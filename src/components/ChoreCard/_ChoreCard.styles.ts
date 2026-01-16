import styled from "@emotion/styled";

export const ChoreCard = styled.div`
  align-items: center;
  background-color: var(--card-color);
  border-radius: 16px;
  color: var(--on-card-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 3px;
  text-align: center;
`;

export const ChoreCard_Background = styled.div`
  align-items: center;
  background: var(--surface);
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

export const ChoreCard_Head = styled.div`
  background-color: var(--card-color);
  border-radius: inherit 0 0 inherit;
  color: var(--on-card-color);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1;
  padding: 0.375rem 1rem 0.625rem;
  text-align: center;
  width: 100%;
`;

export const ChoreCard_Icon = styled.div`
  font-size: 3rem;
  padding: 1rem 1rem 0.5rem 1rem;
  text-align: center;

  svg {
    stroke: var(--card-color);
    aspect-ratio: 1 / 1;
    height: 4rem;
    width: 4rem;
  }
`;

export const ChoreCard_Title = styled.div`
  align-items: center;
  color: var(--on-surface);
  display: flex;
  flex-grow: 1;
  padding: 0 1rem 0.5rem 1rem;
`;

export const ChoreCard_Foot = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 0 1rem 1rem 1rem;
`;

export const ChoreCard_ButtonIncrementDecrement = styled.button`
  align-items: center;
  background: oklch(from white l c h / 0.05);
  border: 2px solid;
  border-radius: calc(infinity * 1px);
  color: var(--card-color);
  display: flex;
  height: 2rem;
  justify-content: center;
  width: 2rem;

  &[disabled] {
    opacity: 0.25;
  }
`;

export const ChoreCard_ButtonDecrement = styled(
  ChoreCard_ButtonIncrementDecrement
)``;

export const ChoreCard_ButtonIncrement = styled(
  ChoreCard_ButtonIncrementDecrement
)`
  background-color: var(--card-color);
  color: var(--on-card-color);
  border-color: var(--card-color);
`;

export const ChoreCard_Quantity = styled.div`
  color: var(--on-surface);
  font-size: 1.5rem;
  font-weight: 400;
`;
