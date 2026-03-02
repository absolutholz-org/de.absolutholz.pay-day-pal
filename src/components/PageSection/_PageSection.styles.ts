import styled from "@emotion/styled";

export const PageSection = styled.section`
	&:not(:last-child) {
		margin-bottom: var(--sys-spacing-xl);
	}
`;

export const PageSection_Headline = styled.h2`
	color: var(--sys-color-on-surface);
	font-size: var(--sys-font-size-xl);
	font-weight: 600;
	line-height: 1.3;
	margin-block: 0 var(--sys-spacing-md);
`;
