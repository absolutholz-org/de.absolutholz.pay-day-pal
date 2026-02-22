import styled from "@emotion/styled";

import { PageContainer } from "../PageContainer";
import { PageHeadline } from "../PageHeadline";

export const PageHeader = styled(PageContainer)`
	padding-block: 2rem 1.5rem;
`;

export const PageHeader_Column_Main = styled.div`
	display: flex;
	gap: 1rem;
`;

export const PageHeader_Column_Lead = styled.div`
	margin-left: -1rem;
`;

export const PageHeader_Column_Trail = styled.div`
	margin-left: auto;
	margin-right: -1rem;
`;

export const PageHeader_MainHeadline = styled(PageHeadline)``;

export const PageHeader_MainAdditional = styled.div`
	margin-top: 0.25rem;
`;
