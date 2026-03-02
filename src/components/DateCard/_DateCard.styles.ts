import styled from "@emotion/styled";

export const DateCard = styled.button`
	align-items: center;
	background: var(--sys-color-background);
	border-radius: var(--sys-radius-lg);
	color: var(--sys-color-on-background);
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 10rem;
	padding: var(--sys-spacing-md);
	position: relative;
	transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);

	&:hover {
		box-shadow:
			0 4px 6px -1px rgb(var(--shadow-color) / 10%),
			0 2px 4px -2px rgb(var(--shadow-color) / 10%);
	}
`;

export const DateWeekday = styled.span`
	color: var(--sys-color-on-background);
	display: block;
	font-size: var(--sys-font-size-xs);
	font-weight: 700;
	margin-bottom: var(--sys-spacing-xs);
	text-transform: uppercase;
`;

export const DateDay = styled.span`
	display: block;
	font-size: var(--sys-font-size-xl);
	font-weight: 600;
`;

export const DateEarnings = styled.span`
	color: var(--accent-green);
	display: block;
	font-size: var(--sys-font-size-sm);
	font-weight: 700;
	margin-top: var(--sys-spacing-sm);
`;

export const DateCard_Active = styled(DateCard)`
	background-image: linear-gradient(
		to right bottom,
		oklch(0.627 0.265 303.9) 0%,
		oklch(0.656 0.241 354.308) 100%
	);
	box-shadow:
		0 20px 25px -5px rgb(var(--shadow-color) / 10%),
		0 8px 10px -6px rgb(var(--shadow-color) / 10%);
	color: white;
	scale: 1.05;

	> * {
		color: inherit !important;
	}
`;
