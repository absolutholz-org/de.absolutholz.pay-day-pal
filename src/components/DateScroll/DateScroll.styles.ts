import styled from '@emotion/styled';

export const DateScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.75rem;
  padding: 0.5rem 0.25rem;
  margin-bottom: 1.5rem;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
