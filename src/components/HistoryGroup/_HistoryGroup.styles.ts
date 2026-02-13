import styled from "@emotion/styled";

export const HistoryGroupHeader = styled.div`
	align-items: center;
	color: white;
	display: flex;
	gap: 0.75rem;
	padding: 1.25rem 1.5rem;
	padding: 1rem;
`;

export const HistoryGroupHeader_Day = styled(HistoryGroupHeader)`
	background-image: linear-gradient(
		to right,
		oklch(0.558 0.288 302.321) 0%,
		oklch(0.592 0.249 0.584) 100%
	);
`;

export const HistoryGroupHeader_Member = styled(HistoryGroupHeader)`
	background-color: var(--member-color);
`;

export const HistoryGroupHeader_Icon = styled.div`
	font-size: 1.875rem;
	line-height: 1.2;
`;

export const HistoryGroupHeader_Main = styled.div`
	flex-grow: 1;
`;

export const HistoryGroupHeader_Amount = styled.div`
	font-size: 1.5rem;
	font-weight: 700;
	letter-spacing: -0.02em;
`;

export const HistoryGroupHeader_Title = styled.div`
	font-size: 1.125rem;
	font-weight: 700;
`;

export const HistoryGroupHeader_Subtitle = styled.div`
	font-size: 0.875rem;
	opacity: 0.9;
`;

export const HistoryCard = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 1.25rem;
	overflow: hidden;
	border: 1px solid var(--card-border);
	background-color: var(--card-bg);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

export const HistoryHeader = styled.div``;

export const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

export const HeaderIcon = styled.div`
	font-size: 1.5rem;
`;

export const HeaderText = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 1.2;
`;

export const HeaderTotal = styled.span`
	font-size: 1.5rem;
	font-weight: 700;
	letter-spacing: -0.02em;
`;
