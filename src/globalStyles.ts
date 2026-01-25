import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { colorSchemeCss } from "./_colorSchemeCss";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    /* The "Minimalist" Stack */
    --font-stack:
      "Avenir Next", "Avenir", "Century Gothic", "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif;
    --font-spacing-primary: 0.05em;

    --radius-pill: calc(infinity * 1px);

    color: var(--on-surface);
    color-scheme: light dark;
    container-name: page;
    container-type: scroll-state;
    font-family: var(--font-stack);
    font-weight: var(--font-weight-primary);
    letter-spacing: var(--font-spacing-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    ${colorSchemeCss({
      lightCssVars: css`
        /* Day Scheme (Light Background) */
        --surface: oklch(100% 0 0);
        --surface-2: oklch(98.5% 0.002 247.8);
        --surface-3: oklch(94.5% 0.004 247.8);
        --on-surface: oklch(18% 0 0);
        --on-surface-2: oklch(38% 0 0);

        --accent-blue: oklch(0.546 0.245 262.881); // Deep Azure
        --accent-green: oklch(0.627 0.194 149.214); // Vivid Green
        --accent-purple: oklch(0.558 0.288 302.321); // Deep Violet
        --accent-orange: oklch(0.646 0.222 41.116); // Burnt Orange
        --accent-red: oklch(0.577 0.245 27.325); // Crimson Red
        --accent-yellow: oklch(0.681 0.162 75.834); // Something Yellow
        --accent-pink: oklch(0.592 0.249 0.584); // Magenta
        --accent-indigo: oklch(0.511 0.262 276.966); // Deep Indigo

        /* Thin text often needs a slight weight boost on dark backgrounds to stay readable */
        --font-weight-primary: 300;

        background-image: linear-gradient(
          to right bottom,
          oklch(0.97 0.014 254.604) 0%,
          oklch(0.977 0.014 308.299) 50%,
          oklch(0.971 0.014 343.198) 100%
        );
      `,
      darkCssVars: css`
        /* Night Scheme (Black Background) */
        --surface: oklch(0% 0 0);
        --surface-2: oklch(18% 0.002 270);
        --surface-3: oklch(25% 0.002 270);
        --on-surface: oklch(100% 0 0);
        --on-surface-2: oklch(76% 0 0);

        --accent-blue: oklch(0.488 0.243 264.376); // Deep Azure
        --accent-green: oklch(0.527 0.154 150.069); // Vivid Green
        --accent-purple: oklch(0.496 0.265 301.924); // Deep Violet
        --accent-orange: oklch(0.553 0.195 38.402); // Burnt Orange
        --accent-red: oklch(0.505 0.213 27.518); // Crimson Red
        --accent-yellow: oklch(0.544 0.135 66.442); // Something Yellow
        --accent-pink: oklch(0.525 0.223 3.958); // Magenta
        --accent-indigo: oklch(0.457 0.24 277.023); // Deep Indigo

        /* Dark text on white can be slightly heavier */
        --font-weight-primary: 400;

        background-image: linear-gradient(
          to right bottom,
          oklch(0.21 0.034 264.665) 0%,
          oklch(0.291 0.149 302.717) 50%,
          oklch(0.282 0.091 267.935) 100%
        );
      `,
    })}
    color: var(--on-surface);
  }

  img {
    display: block;
    max-width: 100%;

    /* https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/ */
    [data-color-scheme="dark"] & {
      filter: brightness(0.8) contrast(1.2);
    }

    @media (prefers-color-scheme: dark) {
      &:not([data-color-scheme="light"]) {
        filter: brightness(0.8) contrast(1.2);
      }
    }
  }

  button {
    appearance: none;
    background: none;
    border: none;
    border-radius: 0px;
    color: inherit;
    cursor: pointer;
    font: inherit;
    margin: 0px;
    overflow: visible;
    padding: 0px;
    width: auto;
    -webkit-font-smoothing: inherit;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  [role="list"] {
    list-style: none;
  }
`;

// App.tsx styles

// export const Header = styled.header`
//   text-align: center;
//   margin-bottom: 3rem;
//   color: #2c3e50;
//   position: relative;
// `;

export const IconButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: oklch(69.6% 0.016 218.4);
  transition: color 0.2s;
  padding: 0.5rem;

  &:hover {
    color: oklch(32.5% 0.045 253.7);
  }
`;

export const BackButton = styled(IconButton)`
  right: auto;
  left: 0;
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 3rem; /* Left of the settings/menu icon */
  color: oklch(63.7% 0.152 253.7);
  animation: spin 1s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  display: flex;
`;

export const Subtitle = styled.p`
  color: var(--on-surface-2);
  font-size: 1.1rem;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "oklch(63.7% 0.152 253.7)" : "oklch(94.6% 0.008 218.4)"};
  color: ${(props) => (props.active ? "white" : "oklch(60.6% 0.016 218.4)")};
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background-color: ${(props) =>
      props.active ? "oklch(54.8% 0.152 253.7)" : "oklch(81.6% 0.012 218.4)"};
  }
`;

export const BalanceDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--surface);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  border: 1px solid oklch(94.6% 0.008 218.4);
`;

export const BalanceLabel = styled.div`
  font-size: 0.9rem;
  color: oklch(60.6% 0.016 218.4);
  margin-bottom: 0.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const BalanceValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: oklch(32.5% 0.045 253.7);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const DateCard = styled.button<{ active: boolean }>`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 4.5rem;
  padding: 0.75rem 0.5rem;
  background: ${(props) =>
    props.active ? "oklch(32.5% 0.045 253.7)" : "white"};
  color: ${(props) => (props.active ? "white" : "oklch(32.5% 0.045 253.7)")};
  border: 1px solid
    ${(props) =>
      props.active ? "oklch(32.5% 0.045 253.7)" : "oklch(94.6% 0.008 218.4)"};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const DateCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
`;

export const DateWeekday = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;

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

export const DateDay = styled.span`
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const DateEarnings = styled.span`
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.25rem;
  opacity: 0.9;
`;

export const ChoreList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid oklch(94.6% 0.008 218.4);
`;

export const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--on-surface);
`;

export const Card = styled.div`
  background: var(--surface);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--surface-2);
  margin-bottom: 1rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: oklch(32.5% 0.045 253.7);
  margin-bottom: 0.5rem;
`;

export const CardMeta = styled.div`
  color: oklch(60.6% 0.016 218.4);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// SettingsScreen.tsx styles

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: oklch(60.6% 0.016 218.4);
  padding: 0.25rem;

  &:hover {
    color: oklch(32.5% 0.045 253.7);
  }
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HistoryItem = styled.div`
  background: var(--surface);
  border: 1px solid oklch(94.6% 0.008 218.4);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: oklch(63.7% 0.152 253.7);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const HistoryDateRange = styled.div`
  font-weight: 600;
  color: oklch(32.5% 0.045 253.7);
  margin-bottom: 0.5rem;
`;

export const ActivityGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const ActivityDateHeader = styled.h4`
  color: oklch(32.5% 0.045 253.7);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  border-bottom: 2px solid oklch(94.6% 0.008 218.4);
  padding-bottom: 0.25rem;
`;

export const ActivityRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--surface);
  border-bottom: 1px solid oklch(96% 0 0);

  &:last-child {
    border-bottom: none;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: oklch(32.5% 0.045 253.7);
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid oklch(81.6% 0.012 218.4);
  font-size: 1rem;
  font-family: inherit;
  color: var(--on-surface);
  background-color: var(--surface);
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: oklch(63.7% 0.152 253.7);
  }
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: oklch(61.4% 0.195 29.2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: inherit;

  &:hover {
    background-color: oklch(51.4% 0.195 29.2);
  }
`;
