import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const HouseholdMemberSelector = styled.div`
	display: flex;
	gap: var(--sys-spacing-md);
	margin-bottom: var(--sys-spacing-xl);
`;

export const HouseholdMemberSelector_Member = styled.button<{
	isActive?: boolean;
}>`
	align-items: center;
	background-color: var(--surface-2);
	border: 2px solid var(--member-color);
	border-radius: var(--radius-pill);
	color: var(--member-color);
	display: flex;
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
			background-color: var(--member-color);
			box-shadow:
				rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
				rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
			color: white;
			scale: 105% 105%;
		`}
`;
