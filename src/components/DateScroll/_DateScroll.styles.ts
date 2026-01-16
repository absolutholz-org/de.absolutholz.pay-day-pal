import styled from "@emotion/styled";

export const DateScrollContainer = styled.div`
  width: 100%; /* Force it to fit within the browser/parent */
  overflow-x: auto; /* Enable horizontal scrolling */
  -webkit-overflow-scrolling: touch;

  /* Optional: Hide scrollbar for a cleaner mobile/app feel */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
`;

export const DateScroll = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 0.75rem;
  padding: 0.5rem 0.25rem;
  margin-bottom: 1.5rem;
  align-items: center;
  width: max-content;

  &::-webkit-scrollbar {
    display: none;
  }
`;
