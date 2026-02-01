import styled from "@emotion/styled";

export const ActivityItem = styled.div`
  align-items: center;
  background-color: var(--surface);
  border-radius: 12px;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  padding: 0.75rem;
`;

export const LeftSide = styled.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
`;

export const IconWrapper = styled.div`
  font-size: 1.875rem;
  line-height: 2.25rem;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemName = styled.div`
  color: var(--on-surface);
  font-weight: 600;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--on-surface-3);
  margin-top: 2px;
`;

// Dynamic styling based on the user
// export const UserBadge = styled.span`
//   display: inline-flex;
//   align-items: center;
//   gap: 4px;
//   padding: 2px 8px;
//   border-radius: 9999px;
//   font-size: 0.75rem;
//   font-weight: 500;
//   color: white;
//   background-color: ${(props) =>
//     props.userType === "Nicky" ? "#3b82f6" : "#a855f7"};
// `;

export const ItemPrice = styled.div`
  font-weight: 700;
  color: var(--accent-green); /* Green-600 */
`;
