import styled from "@emotion/styled";

export const HistoryItem = styled.div`
	align-items: center;
	background-color: var(--card-bg);
	border-radius: 0.875rem;
	display: flex;
	gap: 0.75rem;
	padding: 0.75rem;
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
	font-size: 1rem;
	font-weight: 600;
`;

export const HistoryItem_Children = styled.div`
	color: var(--text-sub);
	display: flex;
	flex-wrap: wrap;
	font-size: 0.875rem;
	gap: 0.25rem 0.75rem;
	line-height: 1.42;
	margin-top: 0.25rem;
`;

export const HistoryItem_Amount = styled.div`
	color: #10b981;
	font-size: 1rem;
	font-weight: 700;
`;
