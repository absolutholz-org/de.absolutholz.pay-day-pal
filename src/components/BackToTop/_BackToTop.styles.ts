import styled from "@emotion/styled";

export const BackToTop = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  container-type: size;
`;

export const BackToTop_Anchor = styled.a`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  pointer-events: auto;

  /* Hidden state */
  opacity: 0;
  transform: translateY(20px);

  /* Animation driven by scroll */
  animation: back-to-top-fade-in 1ms linear forwards;
  animation-timeline: scroll();
  animation-range: 0 100px;

  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(0) scale(1.1);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }

  @keyframes back-to-top-fade-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* @container (width < 600px) {
    .back-to-top {
      bottom: 1rem;
      right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
    }
  } */

  @container page scroll-state(scrollable: top) {
    & {
      // show when scrolled down
    }
  }
`;
