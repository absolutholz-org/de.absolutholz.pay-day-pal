import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const confettiBurstAnimation = keyframes`
  0% {
    transform: translate(-50%, 0) scale(0) rotate(0deg);
    opacity: 1;
  }
  20% {
    transform: translate(calc(-50% + var(--tx) * 0.3), calc(var(--ty) * 0.3)) scale(1.2) rotate(calc(var(--rotation) * 0.3));
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--tx)), var(--ty)) scale(1) rotate(var(--rotation));
    opacity: 0;
  }
`;

export const ConfettiBurst = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
  z-index: 9999;
`;

export const ConfettiBurst_ParticleContainer = styled.div`
  animation: ${confettiBurstAnimation} var(--duration) ease-out forwards;
  bottom: 2rem;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
`;

export const ConfettiBurst_Particle = styled.div`
  color: var(--particle-color);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  font-size: var(--particle-size);
  font-weight: bold;
  text-shadow: 0 0 10px currentColor;
`;
