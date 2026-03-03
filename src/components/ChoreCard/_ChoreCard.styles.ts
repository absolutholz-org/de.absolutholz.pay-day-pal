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
		Use the raw vibrant chore color, with a slight luminance bump at the top.
	*/
	--top-gradient: linear-gradient(
		to bottom right,
		oklch(from var(--chore-color) calc(l + 0.04) c h) 0%,
		var(--chore-color) 100%
	);
	background-color: var(--sys-color-surface);
`;

const darkTheme = css`
	background-color: oklch(0.278 0.033 256.848);
	/* REFINED GRADIENT FORMULA:
		Dark mode uses the raw color too for maximum pop, with slight shift.
  */
	--top-gradient: linear-gradient(
		to bottom right,
		oklch(from var(--chore-color) calc(l + 0.05) c h) 0%,
		var(--chore-color) 100%
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

	color: var(--sys-color-on-surface);
	border-radius: var(--sys-radius-lg);
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
	position: absolute;
`;

const ChoreCard_TopImage_Bubble = styled.div`
	background-color: oklch(from var(--sys-color-surface) l c h / 0.1);
	border-radius: var(--sys-radius-full);
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
	border-radius: var(--sys-radius-full);
	box-shadow:
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
		rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
	color: white;
	font-size: var(--sys-font-size-xs);
	font-weight: 700;
	left: var(--sys-spacing-md);
	line-height: 1.5;
	padding: var(--sys-spacing-xs) var(--sys-spacing-md);
	position: absolute;
	top: var(--sys-spacing-md);
`;

export const ChoreCard_Bottom = styled.div`
	padding: var(--sys-spacing-md);
`;

export const ChoreCard_Title = styled.h3`
	text-align: center;
	align-items: center;
	/* color: oklch(0.278 0.033 256.848); */
	font-size: var(--sys-font-size-lg);
	font-weight: 600;
	justify-content: center;
	line-height: 1.25;
	margin-block: 0 var(--sys-spacing-md);
	min-height: 2.5rem;
	display: flex;
`;

export const ChoreCard_Stepper = styled.div`
	align-items: center;
	display: flex;
	gap: var(--sys-spacing-md);
	justify-content: center;
`;

const ChoreCard_StepperButton = styled.button`
	align-items: center;
	border: 2px solid;
	border-radius: var(--sys-radius-full);
	// color: var(--accent);
	color: var(--chore-color);
	display: flex;
	gap: var(--sys-spacing-md);
	justify-content: center;
	padding: var(--sys-spacing-sm);

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
	font-size: var(--sys-font-size-2xl);
	font-weight: 700;
	line-height: 1.25;
	min-width: 2.5rem;
	text-align: center;
`;

export const ChoreCard_PortionBadge = styled.span`
	align-items: center;
	background-color: oklch(from var(--sys-color-on-surface) l c h / 0.75);
	border: 4px solid oklch(from currentColor l c h / 0.5);
	border-radius: var(--sys-radius-full);
	color: white;
	display: flex;
	font-size: 2.5rem;
	font-weight: 700;
	inset: 0;
	justify-content: center;
	padding-bottom: 0.125em;
	position: absolute;
`;
