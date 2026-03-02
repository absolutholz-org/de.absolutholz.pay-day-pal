import styled from "@emotion/styled";

export const HistoryItem = styled.div`
	align-items: center;
	background-color: var(--card-bg);
	/* background: oklch(0.985 0.002 247.839); */
	border-radius: var(--sys-radius-md);
	display: flex;
	gap: var(--sys-spacing-md);
	padding: var(--sys-spacing-md);
	transition: background-color 0.2s;
`;

export const HistoryItem_Icon = styled.div`
	align-items: center;
	display: flex;
	font-size: 2.25rem;
	justify-content: center;
	line-height: 1;
`;

export const HistoryItem_Content = styled.div`
	flex-grow: 1;
`;

export const HistoryItem_Title = styled.div`
	color: var(--text-main);
	font-size: var(--sys-font-size-base);
	font-weight: 600;
`;

export const HistoryItem_Children = styled.div`
	color: var(--text-sub);
	display: flex;
	flex-wrap: wrap;
	font-size: var(--sys-font-size-sm);
	gap: var(--sys-spacing-xs) var(--sys-spacing-md);
	line-height: 1.42;
	margin-top: var(--sys-spacing-xs);
`;

export const HistoryItem_Amount = styled.div`
	color: var(--accent-green);
	font-size: var(--sys-font-size-base);
	font-weight: 700;
`;
