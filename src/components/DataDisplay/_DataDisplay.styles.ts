import styled from "@emotion/styled";

export const DataDisplay = styled.div`
	align-items: baseline;
	display: flex;
	gap: var(--sys-spacing-sm);

	&:not(:last-child) {
		margin-bottom: var(--sys-spacing-sm);
	}
`;

export const DataDisplay_Label = styled.span`
	color: var(--on-surface-3);
	font-size: var(--sys-font-size-sm);
	font-weight: 500;
`;

export const DataDisplay_Icon = styled.span`
	color: var(--on-surface-2);
	font-size: var(--sys-font-size-xl);
`;

export const DataDisplay_Data = styled.span`
	color: var(--on-surface-2);
	font-size: var(--sys-font-size-base);
	font-weight: 600;
`;
