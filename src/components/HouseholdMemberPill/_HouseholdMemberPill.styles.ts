import styled from "@emotion/styled";
import { HouseholdMemberPillSize } from "./_HouseholdMemberPill.types";
import { css } from "@emotion/react";

export const Pill = styled.button<{
  isActive: boolean;
  size: HouseholdMemberPillSize;
}>`
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

  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow:
        rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
        rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
      scale: 105% 105%;
    `}

  ${({ isActive, size }) =>
    (isActive || size === "small") &&
    css`
      background-color: var(--member-color);
      border-color: transparent;
      color: white;
    `}

  ${({ size }) =>
    size === "small" &&
    css`
      border: 0;
      font-size: 0.75rem;
      font-weight: 500;
      gap: 0.375rem;
      padding: 0.125rem 0.5rem;
    `}
`;

export const Icon = styled.span<{
  isActive: boolean;
  size: HouseholdMemberPillSize;
}>`
  align-items: center;
  background-color: var(--member-color);
  border-radius: var(--radius-pill);
  display: inline-flex;
  font-size: 1.125em;
  height: 2em;
  justify-content: center;
  margin-left: -0.5rem;
  width: 2em;

  ${({ isActive }) =>
    isActive &&
    css`
      backdrop-filter: 8px;
      background-color: oklch(from white l c h / 0.5);
    `}

  ${({ size }) =>
    size === "small" &&
    css`
      background: none;
      font-size: 1em;
      height: 1em;
      margin-left: 0;
      width: 1em;
    `}
`;
