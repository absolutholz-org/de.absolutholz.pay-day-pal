import styled from "@emotion/styled";

export const Row = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

export const EmojiContainer = styled.div`
  width: 60px;
`;

export const NameContainer = styled.div`
  flex: 1;
`;

export const ColorContainer = styled.div`
  width: 120px;
`;
