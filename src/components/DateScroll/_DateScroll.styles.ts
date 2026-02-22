import styled from "@emotion/styled";

import { FullBleedScrollableContainer } from "../FullBleedScrollableContainer";

export const DateScroll = styled(FullBleedScrollableContainer)`
	margin-block: -0.25rem -0.675rem; // Compensate for the spacing added for the drop shadow of the date cards plus a little extra to ensure the last card's shadow is fully visible
	padding-block: 0.25rem 2.675rem; // Compensate for the drop shadow of the DateCards
`;
