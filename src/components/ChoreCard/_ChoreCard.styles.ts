import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const onCardActive = (styles: SerializedStyles) => css`
  [data-count] & {
    ${styles}
  }
`;

const HORIZONTAL_PADDING = "1.5rem";

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
  position: relative;
  text-align: center;
  z-index: 0;
`;

export const ChoreCard_Background = styled.div`
  align-items: center;
  background: var(--surface);
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  ${onCardActive(
    css`
      background: none;
    `
  )}
`;

export const ChoreCard_Head = styled.div`
  background-color: var(--card-color);
  border-radius: inherit 0 0 inherit;
  color: var(--on-card-color);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1;
  padding: 0.375rem ${HORIZONTAL_PADDING} 0.625rem;
  text-align: center;
  width: 100%;
`;

export const ChoreCard_Icon = styled.div`
  color: var(--card-color);
  font-size: 3rem;
  padding: 1rem ${HORIZONTAL_PADDING} 0.5rem;
  text-align: center;

  svg {
    stroke: currentColor;
    aspect-ratio: 1 / 1;
    height: 4rem;
    width: 4rem;
  }

  ${onCardActive(
    css`
      color: inherit;
    `
  )}
`;

export const ChoreCard_Title = styled.div`
  align-items: center;
  color: var(--on-surface);
  display: flex;
  flex-grow: 1;
  font-weight: 400;
  padding: 0 ${HORIZONTAL_PADDING} 0.75rem;

  ${onCardActive(
    css`
      color: inherit;
    `
  )}
`;

export const ChoreCard_Foot = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 0 ${HORIZONTAL_PADDING} 1rem;
`;

export const ChoreCard_ButtonIncrementDecrement = styled.button`
  align-items: center;
  background: oklch(from white l c h / 0.25);
  border: 2px solid;
  border-radius: calc(infinity * 1px);
  color: var(--card-color);
  display: flex;
  height: 2rem;
  justify-content: center;
  transition-property: all;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: 2rem;

  &:hover:not([disabled]) {
    scale: 110% 110%;
  }

  &[disabled] {
    opacity: 0.25;
  }

  ${onCardActive(
    css`
      color: var(--on-card-color);
    `
  )}
`;

export const ChoreCard_ButtonDecrement = styled(
  ChoreCard_ButtonIncrementDecrement
)``;

export const ChoreCard_ButtonIncrement = styled(
  ChoreCard_ButtonIncrementDecrement
)`
  // &::after {
  //   content: "";
  //   inset: 0;
  //   position: absolute;
  //   z-index: 1;
  // }

  // :not([data-count]) & {
  //   background-color: var(--card-color);
  //   color: var(--on-card-color);
  //   border-color: var(--card-color);
  // }
`;

export const ChoreCard_Quantity = styled.div`
  color: var(--on-surface);
  font-size: 1.5rem;
  font-weight: 400;

  ${onCardActive(
    css`
      color: inherit;
    `
  )}
`;
