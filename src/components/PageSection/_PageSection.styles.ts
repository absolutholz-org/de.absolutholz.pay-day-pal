import styled from "@emotion/styled";

export const PageSection = styled.section`
	&:not(:last-child) {
		margin-bottom: 2.5rem;
	}
`;

export const PageSection_Headline = styled.h2`
	color: var(--on-surface);
	font-size: 1.25rem;
	font-weight: 600;
	line-height: 1.3;
	margin-block: 0 1rem;
`;
