import styled from "@emotion/styled";

import { PageContainer } from "../PageContainer";
import { PageHeadline } from "../PageHeadline";

export const PageHeader = styled(PageContainer)`
	padding-block: var(--sys-spacing-xl) var(--sys-spacing-lg);
`;

export const PageHeader_Column_Main = styled.div`
	display: flex;
	gap: var(--sys-spacing-md);
`;

export const PageHeader_Column_Lead = styled.div`
	margin-left: calc(var(--sys-spacing-md) * -1);
`;

export const PageHeader_Column_Trail = styled.div`
	margin-left: auto;
	margin-right: calc(var(--sys-spacing-md) * -1);
`;

export const PageHeader_MainHeadline = styled(PageHeadline)``;

export const PageHeader_MainAdditional = styled.div`
	margin-top: var(--sys-spacing-xs);
`;
