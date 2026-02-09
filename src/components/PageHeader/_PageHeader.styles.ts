import styled from "@emotion/styled";
import { PageHeadline } from "../PageHeadline";

export const PageHeader = styled.header`
	> * {
		align-items: start;
		display: flex;
		gap: 1rem;
	}
`;

export const PageHeader_Column_Lead = styled.div`
	margin-left: -1rem;
`;

export const PageHeader_Column_Main = styled.div`
	flex-grow: 1;
`;

export const PageHeader_Column_Trail = styled.div`
	margin-right: -1rem;
`;

export const PageHeader_MainHeadline = styled(PageHeadline)``;
export const PageHeader_MainAdditional = styled.div`
	margin-top: 0.5rem;
`;
