import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
`;

export const CardLabel = styled.label<{ isSelected?: boolean }>`
  align-items: center;
  border-radius: 0.75rem;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  outline: none;
  padding: 1rem;
  position: relative;
  transition: all 0.2s ease-in-out;
  width: 100%;

  /* BASE STATE */
  background-color: var(--card-bg);
  border-color: var(--card-border);
  color: var(--text-sub);

  /* HOVER STATE (Unselected) */
  /* We use RCS to darken/lighten based on the card background dynamically, 
     OR we just use a slight opacity of the text color as a "tint". 
     Here we use a transparency of the semantic text color for a neutral hover. */
  &:hover {
    background-color: oklch(from var(--card-bg) l c h / 0.8);
    border-color: oklch(from var(--text-sub) l c h / 0.3);
  }

  /* Target the child by class name to avoid component interpolation */
  &:hover .icon-animator {
    transform: scale(1.1);
  }

  /* Focus Ring: Accent with 30% opacity */
  &:focus-within {
    box-shadow: 0 0 0 4px oklch(from var(--accent) l c h / 0.3);
  }

  /* SELECTED STATE */
  /* Here is the magic: We use the single --accent variable to derive everything. */
  &:has(:checked) {
    /* Background: Accent color with 10% opacity. Works on dark & light! */
    background-color: oklch(from var(--accent) l c h / 0.1);
    border-color: var(--accent);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    /* Text: In light mode, we might want darker. In dark mode, lighter.
       But usually, the accent color itself is legible if chosen well (mid-tone).
       Or we can use the main text color. Let's use the Accent for pop. */
    color: var(--accent);
  }
`;

export const CheckBadge = styled.div`
  align-items: center;
  animation: ${zoomIn} 0.2s ease-out;
  background-color: var(--accent);
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: #fff; /* Always white text on the filled badge */
  display: flex;
  font-size: 0.75rem;
  font-weight: 700;
  height: 1.25rem;
  justify-content: center;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 1.25rem;

  input:not(:checked) + & {
    display: none;
  }
`;

export const IconWrapper = styled.div<{ isSelected?: boolean }>`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  transform: ${({ isSelected = false }) =>
    isSelected ? "scale(1.1)" : "scale(1)"};
  transition: transform 0.2s;
`;

export const CardText = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
`;
