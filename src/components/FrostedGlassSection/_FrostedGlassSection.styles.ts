import styled from "@emotion/styled";

export const FrostedGlassSection = styled.section`
	background-color: var(--section-bg);
	border: 1px solid var(--section-border);
	border-radius: var(--sys-radius-lg);
	/* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); */
	box-shadow:
		rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
		rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
	margin-bottom: var(--sys-spacing-md);
	padding: var(--sys-spacing-lg);
	transition:
		background-color 0.3s ease,
		border-color 0.3s ease;
`;

export const FrostedGlassSection_Headline = styled.h3`
	color: var(--text-sub);
	font-size: var(--sys-font-size-sm);
	font-weight: 700;
	letter-spacing: 0.05em;
	margin-bottom: var(--sys-spacing-md);
	text-transform: uppercase;
`;
