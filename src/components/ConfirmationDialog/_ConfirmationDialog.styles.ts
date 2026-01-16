import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ModalTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: oklch(32.5% 0.045 253.7);
  font-size: 1.25rem;
`;

export const ModalText = styled.p`
  color: oklch(60.6% 0.016 218.4);
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const ModalButton = styled.button<{
  variant?: "primary" | "danger" | "secondary";
}>`
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
  background-color: ${(props) =>
    props.variant === "danger"
      ? "oklch(61.4% 0.195 29.2)"
      : props.variant === "secondary"
      ? "oklch(94.6% 0.008 218.4)"
      : "oklch(63.7% 0.152 253.7)"};
  color: ${(props) =>
    props.variant === "secondary" ? "oklch(60.6% 0.016 218.4)" : "white"};

  &:hover {
    background-color: ${(props) =>
      props.variant === "danger"
        ? "oklch(51.4% 0.195 29.2)"
        : props.variant === "secondary"
        ? "oklch(81.6% 0.012 218.4)"
        : "oklch(54.8% 0.152 253.7)"};
  }
`;
