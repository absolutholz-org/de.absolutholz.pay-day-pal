import styled from "@emotion/styled";

export const DateScroll_Container = styled.div`
  width: 100%; /* Force it to fit within the browser/parent */
  overflow-x: auto; /* Enable horizontal scrolling */
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 0.25rem;

  /* Optional: Hide scrollbar for a cleaner mobile/app feel */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
`;

export const DateScroll = styled.ol`
  align-items: center;
  display: grid;
  gap: 0.75rem;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0.25rem;
  width: max-content;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DateScroll_ListItem = styled.li`
  scroll-snap-align: start;
`;
