import styled from "@emotion/styled";

export const BalanceDisplay = styled.div`
	background-image: linear-gradient(
		to right bottom,
		oklch(0.792 0.209 151.711) 0%,
		oklch(0.696 0.17 162.48) 100%
	);
	border-radius: 24px;
	box-shadow:
		rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
		rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
	color: white;
	margin-bottom: 2rem;
	max-width: 30rem;
	padding: 1.5rem;
`;

export const BalanceDisplay_Label = styled.div`
	font-size: 1rem;
	font-weight: 600;
	letter-spacing: 0.35px;
	opacity: 0.9;
	text-transform: uppercase;
`;

export const BalanceDisplay_Value = styled.div`
	font-size: 2.5rem;
	font-weight: 700;
`;
