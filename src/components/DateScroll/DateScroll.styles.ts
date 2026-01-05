import styled from "@emotion/styled";

export const DateScroll = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  overflow-x: auto;
  gap: 0.75rem;
  padding: 0.5rem 0.25rem;
  margin-bottom: 1.5rem;
  -webkit-overflow-scrolling: touch;
  align-items: center;
  width: max-content;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DateCard = styled.button<{ active: boolean; isToday: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: ${(props) => (props.active ? "#2c3e50" : "white")};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: 1px solid ${(props) => (props.active ? "#2c3e50" : "#ecf0f1")};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;

  ${(props) =>
    props.isToday &&
    `
    border-color: #3498db;
    box-shadow: 0 8px 16px rgba(52, 152, 219, 0.25);
    z-index: 2;
    transform: scale(1.05);
  `}

  &:hover {
    transform: ${(props) =>
      props.isToday ? "scale(1.02) translateY(-2px)" : "translateY(-2px)"};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const DateCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
  width: 100%;
`;

export const DateWeekday = styled.span<{ isToday?: boolean }>`
  display: block;
  font-size: ${(props) => (props.isToday ? "0.9rem" : "0.8rem")};
  font-weight: ${(props) => (props.isToday ? "800" : "600")};
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 0.25rem;

  .long {
    display: none;
  }
  .short {
    display: block;
  }

  @media (min-width: 640px) {
    .long {
      display: block;
    }
    .short {
      display: none;
    }
  }
`;

export const DateDay = styled.span<{ isToday?: boolean }>`
  display: block;
  font-size: ${(props) => (props.isToday ? "1.4rem" : "1.2rem")};
  font-weight: 700;
`;

export const DateEarnings = styled.span`
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.25rem;
  opacity: 0.9;
`;
