import styled from "@emotion/styled";

export const HistoryGroup = styled.details`
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

export const HistoryGroup_Summary = styled.summary`
  align-items: center;
  background: linear-gradient(to right, #a855f7, #ec4899);
  color: white;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  padding: 1rem;

  /* Hiding the default browser triangle marker */
  list-style: none;
  &::-webkit-details-marker {
    display: none;
  }

  /* Rotating a custom chevron when open */
  &::after {
    align-items: center;
    content: "▼";
    display: flex;
    font-size: 0.75rem;
    height: 2rem;
    justify-content: center;
    transition: transform 0.2s;
    width: 2rem;
  }

  /* Rotate the chevron when the parent details is open */
  details[open] &::after {
    transform: rotate(180deg);
  }
`;

export const HistoryGroup_HeaderMain = styled.div`
  flex-grow: 1;
`;

export const HistoryGroup_Title = styled.div`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

export const HistoryGroup_ActivityCount = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

export const HistoryGroup_TotalAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const HistoryGroup_List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

export const HistoryGroup_ListItem = styled.li``;
