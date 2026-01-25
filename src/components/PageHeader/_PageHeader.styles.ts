import styled from "@emotion/styled";
import { PageHeadline } from "../PageHeadline";

export const PageHeader = styled.header`
  > * {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
  }
`;

export const PageHeader_Column_Lead = styled.div``;

export const PageHeader_Column_Main = styled.div``;

export const PageHeader_Column_Trail = styled.div``;

export const PageHeader_Headline = styled(PageHeadline)`
  margin-block: 0 0.5rem;
`;
