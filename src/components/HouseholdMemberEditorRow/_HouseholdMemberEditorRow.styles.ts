import styled from "@emotion/styled";
import { IconButton } from "../../globalStyles";

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

export const ActionButton = styled(IconButton)<{ disabledMember?: boolean }>`
  position: static;
  color: ${(props) => (props.disabledMember ? "#2ecc71" : "#e74c3c")};
`;
