import styled from "@emotion/styled";

export const Pill = styled.button`
	align-items: center;
	background-color: var(--pill-accent);
	border: 3px solid var(--pill-accent);
	border-radius: var(--radius-pill);
	display: inline-flex;
	justify-content: center;
`;

export const Pill_Small = styled(Pill)`
	font-size: var(--sys-font-size-sm);
`;

export const Pill_Medium = styled(Pill)`
	font-size: var(--sys-font-size-base);
`;

export const Pill_Large = styled(Pill)`
	font-size: var(--sys-font-size-xl);
`;

const Pill_Base = styled.span`
	align-items: center;
	display: inline-flex;
	height: 2em;
	justify-content: center;
	min-width: 2em;
	padding-bottom: 0.125em;
`;

export const Pill_Content = styled(Pill_Base)`
	background-color: var(--on-pill-accent);
	border-radius: inherit;
	color: var(--pill-accent);
	font-weight: 700;
	padding-inline: 1em;
	white-space: nowrap;
`;

export const Pill_SlotLeadTrail = styled(Pill_Base)`
	/* font-size: 1.25em; */
`;

export const Pill_SlotLead = styled(Pill_SlotLeadTrail)`
	padding-left: 0.25em;
`;

export const Pill_SlotTrail = styled(Pill_SlotLeadTrail)`
	padding-right: 0.25em;
`;
