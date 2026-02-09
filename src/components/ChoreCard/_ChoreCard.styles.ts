import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

import { colorSchemeCss } from "../../_colorSchemeCss";

export const onCardActive = (styles: SerializedStyles) => css`
	[data-count] & {
		${styles}
	}
`;

const lightTheme = css`
	/* CALCULATED FORMULA:
		1. Start Color: Lighten base by 0.16 (Matches your 'Fade From' values)
		2. End Color:   Lighten base by 0.08 (Matches your 'Fade To' values)

		Note: We keep hue (h) and chroma (c) inherited from the base 
		to ensure the tone remains consistent.
	*/
	--top-gradient: linear-gradient(
		to bottom right,
		oklch(from var(--chore-color) calc(l + 0.16) c h) 0%,
		oklch(from var(--chore-color) calc(l + 0.08) c h) 100%
	);
	background-color: var(--surface);
`;

const darkTheme = css`
	background-color: oklch(0.278 0.033 256.848);
	/* REFINED GRADIENT FORMULA:
    Start: Lightness + 0.22 | Chroma * 0.75 (Softer, matte start)
    End:   Lightness + 0.13 | Chroma * 0.9  (Slightly deeper/richer end)
  */
	--top-gradient: linear-gradient(
		to bottom right,
		oklch(from var(--chore-color) calc(l + 0.22) calc(c * 0.75) h) 0%,
		oklch(from var(--chore-color) calc(l + 0.13) calc(c * 0.9) h) 100%
	);
`;

export const ChoreCard = styled.div`
	${colorSchemeCss({
		darkCssVars: css`
			${darkTheme}
		`,
		lightCssVars: css`
			${lightTheme}
		`,
	})}

	color: var(--on-surface);
	border-radius: 1.5rem;
	box-shadow:
		0 10px 15px -3px rgb(var(--shadow-color) / 10%),
		0 4px 6px -4px rgb(var(--shadow-color) / 10%);
	overflow: hidden;
	position: relative;
	z-index: 0;
`;

export const ChoreCard_Top = styled.div`
	position: relative;
`;

export const ChoreCard_TopImage = styled.div`
	align-items: center;
	background-image: var(--top-gradient);
	display: flex;
	height: 7rem;
	justify-content: center;
	overflow: hidden;
`;

export const ChoreCard_TopImage_Bubbles = styled.div`
	inset: 0;
	opacity: 0.1;
	position: absolute;
`;

const ChoreCard_TopImage_Bubble = styled.div`
	background-color: var(--surface);
	border-radius: calc(infinity * 1px);
	position: absolute;
`;

export const ChoreCard_TopImage_Bubble1 = styled(ChoreCard_TopImage_Bubble)`
	height: 4rem;
	right: 5%;
	top: 0.5rem;
	width: 4rem;
`;

export const ChoreCard_TopImage_Bubble2 = styled(ChoreCard_TopImage_Bubble)`
	height: 3rem;
	left: 5%;
	bottom: 0.75rem;
	width: 3rem;
`;

export const ChoreCard_TopIcon = styled.div`
	filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 4px 4px);
	font-size: 3rem;
	line-height: 1;
`;

export const ChoreCard_TopPill = styled.span`
	// background-color: oklch(0.546 0.245 262.881);
	background-color: var(--chore-color);
	border-radius: calc(infinity * 1px);
	box-shadow:
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
		rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
	color: white;
	font-size: 0.75rem;
	font-weight: 700;
	left: 0.75rem;
	line-height: 1.5;
	padding: 0.375rem 0.75rem;
	position: absolute;
	top: 0.75rem;
`;

export const ChoreCard_Bottom = styled.div`
	padding: 1rem;
`;

export const ChoreCard_Title = styled.h3`
	text-align: center;
	align-items: center;
	/* color: oklch(0.278 0.033 256.848); */
	font-size: 1.125rem;
	font-weight: 600;
	justify-content: center;
	line-height: 1.25;
	margin-block: 0 1rem;
	min-height: 2.5rem;
	display: flex;
`;

export const ChoreCard_Stepper = styled.div`
	align-items: center;
	display: flex;
	gap: 0.875rem;
	justify-content: center;
`;

const ChoreCard_StepperButton = styled.button`
	align-items: center;
	border: 2px solid;
	border-radius: calc(infinity * 1px);
	// color: var(--accent);
	color: var(--chore-color);
	display: flex;
	gap: 0.875rem;
	justify-content: center;
	padding: 0.5rem;

	/* Hover: A very faint tint of the base color */
	&:hover:not(:disabled) {
		background-color: oklch(from var(--chore-color) l c h / 0.15);
	}

	&[disabled] {
		color: gray;
		opacity: 0.25;
	}
`;

export const ChoreCard_StepperButton_Decrement = styled(
	ChoreCard_StepperButton,
)`
	position: relative;
	z-index: 2;
`;

export const ChoreCard_StepperButton_Increment = styled(
	ChoreCard_StepperButton,
)`
	&::after {
		content: "";
		display: block;
		inset: 0;
		position: absolute;
		z-index: 1;
	}
`;

export const ChoreCard_StepperButtonIcon = styled.svg`
	height: 1rem;
	width: 1rem;
`;

export const ChoreCard_StepperValue = styled.span`
	/* color: oklch(0.278 0.033 256.848); */
	font-size: 1.5rem;
	font-weight: 700;
	line-height: 1.25;
	min-width: 2.5rem;
	text-align: center;
`;
