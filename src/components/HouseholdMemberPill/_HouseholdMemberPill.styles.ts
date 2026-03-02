import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { type HouseholdMemberPillSize } from "./_HouseholdMemberPill.types";

export const Pill = styled.button<{
	isActive: boolean;
	size: HouseholdMemberPillSize;
}>`
	align-items: center;
	background-color: var(--surface-2);
	border: 2px solid var(--member-color);
	border-radius: var(--radius-pill);
	color: var(--member-color);
	display: inline-flex;
	font-size: var(--sys-font-size-base);
	font-weight: 600;
	gap: var(--sys-spacing-sm);
	justify-content: center;
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
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
			font-size: var(--sys-font-size-xs);
			font-weight: 500;
			gap: var(--sys-spacing-xs);
			padding: 0.125rem var(--sys-spacing-sm);
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
	margin-left: calc(var(--sys-spacing-sm) * -1);
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
