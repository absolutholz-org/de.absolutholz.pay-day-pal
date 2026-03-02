import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const Grid = styled.div`
	display: grid;
	gap: var(--sys-spacing-md);
	grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
`;

export const CardLabel = styled.label<{ isSelected?: boolean }>`
	align-items: center;

	/* BASE STATE */
	background-color: var(--card-bg);
	border-color: var(--card-border);
	border-radius: var(--sys-radius-md);
	border-style: solid;
	border-width: 2px;
	color: var(--text-sub);
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	outline: none;
	padding: var(--sys-spacing-md);
	position: relative;
	transition: all 0.2s ease-in-out;
	width: 100%;

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
		box-shadow: 0 0 0 4px oklch(from var(--sys-color-primary) l c h / 0.3);
	}

	/* SELECTED STATE */
	/* Here is the magic: We use the single --accent variable to derive everything. */
	&:has(:checked) {
		/* Background: Accent color with 10% opacity. Works on dark & light! */
		background-color: oklch(from var(--sys-color-primary) l c h / 0.1);
		border-color: var(--sys-color-primary);
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		/* Text: In light mode, we might want darker. In dark mode, lighter.
       But usually, the accent color itself is legible if chosen well (mid-tone).
       Or we can use the main text color. Let's use the Accent for pop. */
		color: var(--sys-color-primary);
	}
`;

export const CheckBadge = styled.div`
	align-items: center;
	animation: ${zoomIn} 0.2s ease-out;
	background-color: var(--sys-color-primary);
	border-radius: var(--sys-radius-full);
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	color: #fff; /* Always white text on the filled badge */
	display: flex;
	font-size: var(--sys-font-size-xs);
	font-weight: 700;
	height: 1.25rem;
	justify-content: center;
	position: absolute;
	right: var(--sys-spacing-sm);
	top: var(--sys-spacing-sm);
	width: 1.25rem;

	input:not(:checked) + & {
		display: none;
	}
`;

export const IconWrapper = styled.div<{ isSelected?: boolean }>`
	font-size: 2rem;
	margin-bottom: var(--sys-spacing-sm);
	transform: ${({ isSelected = false }) =>
		isSelected ? "scale(1.1)" : "scale(1)"};
	transition: transform 0.2s;
`;

export const CardText = styled.span`
	font-size: var(--sys-font-size-sm);
	font-weight: 500;
	letter-spacing: 0.025em;
`;
