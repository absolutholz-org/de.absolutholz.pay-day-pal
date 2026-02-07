import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideUp = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

export const DialogBase = styled.dialog`
  /* Reset Default User Agent Styles */
  border: none;
  padding: 0;
  margin: auto;
  background: transparent;
  max-width: calc(100% - 2rem);

  /* Positioning & Layering */
  &::backdrop {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    animation: ${fadeIn} 0.3s ease-out;
  }

  /* Open State Animation */
  &[open] {
    animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Focus Outline */
  &:focus-visible {
    outline: none;
  }
`;

export const DialogContainer = styled.div`
  width: 100%;
  max-width: 480px; /* Matching the 'max-w-md' from your snippet */
  border-radius: 24px;
  overflow: hidden;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  background-color: var(--card-bg);
  border-color: var(--card-border);
  color: var(--text-sub);
`;

export const Header = styled.div`
  align-items: center;
  background: linear-gradient(
    to right,
    rgba(88, 28, 135, 0.2),
    rgba(131, 24, 67, 0.2)
  ); /* purple/pink hint */
  border-bottom: 1px solid rgba(55, 65, 81, 0.7);
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 20px 24px;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;

  /* Gradient Text Effect */
  background: linear-gradient(
    to right,
    #a855f7,
    #db2777
  ); /* purple-500 to pink-500 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: scale(1.1);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 0 1.5rem 1.5rem;
`;

// --- Reusable Buttons ---

export const ButtonBase = styled.button`
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const GhostButton = styled(ButtonBase)`
  background: transparent;
  color: #d1d5db; /* gray-300 */
  box-shadow: none;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
`;

export const PrimaryButton = styled(ButtonBase)`
  background: linear-gradient(to right, #a855f7, #ec4899); /* purple to pink */
  color: white;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.4);
  }
`;

export const DestructiveButton = styled(ButtonBase)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }
`;
