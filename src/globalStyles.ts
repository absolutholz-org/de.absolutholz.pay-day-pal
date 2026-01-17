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
    --font-stack: "Avenir Next", "Avenir", "Century Gothic", "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    --font-spacing-primary: 0.05em;

    container-type: scroll-state;
    container-name: page;

    color-scheme: light dark;
    ${colorSchemeCss({
      lightCssVars: css`
        /* Day Scheme (Light Background) */
        --surface: oklch(100% 0 0);
        --surface-2: oklch(98.5% 0.002 247.8);
        --surface-3: oklch(94.5% 0.004 247.8);
        --on-surface: oklch(18% 0 0);
        --on-surface-2: oklch(38% 0 0);

        /* Accent Colors (Optimized for AA compliance on White) */
        --accent-red: oklch(
          54.3% 0.207 28.6
        ); /* Increased depth for contrast */
        --on-accent-red: oklch(100% 0 0);

        --accent-green: oklch(51% 0.168 142); /* Darkened to pass on white */
        --on-accent-green: oklch(100% 0 0);

        --accent-blue: oklch(54.8% 0.184 263.2); /* Standard accessible blue */
        --on-accent-blue: oklch(100% 0 0);

        --accent-yellow: oklch(
          69.6% 0.192 69.1
        ); /* Shifted toward amber to be visible on white */
        --on-accent-yellow: oklch(0% 0 0);

        --accent-orange: oklch(
          57.6% 0.217 48.8
        ); /* Deep orange for legibility */
        --on-accent-orange: oklch(100% 0 0);

        --accent-purple: oklch(46.1% 0.218 311.6); /* Royal purple */
        --on-accent-purple: oklch(100% 0 0);

        --accent-pink: oklch(51.3% 0.215 353.7); /* Deep magenta */
        --on-accent-pink: oklch(100% 0 0);

        /* Thin text often needs a slight weight boost on dark backgrounds to stay readable */
        --font-weight-primary: 300;
      `,
      darkCssVars: css`
        /* Night Scheme (Black Background) */
        --surface: oklch(0% 0 0);
        --surface-2: oklch(18% 0.002 270);
        --surface-3: oklch(25% 0.002 270);
        --on-surface: oklch(100% 0 0);
        --on-surface-2: oklch(76% 0 0);

        /* Accent Colors (Optimized for AA compliance on Black) */
        --accent-red: oklch(69.8% 0.226 26.3); /* Brighter for "glow" effect */
        --on-accent-red: oklch(0% 0 0);

        --accent-green: oklch(
          85.9% 0.233 154.2
        ); /* Neon green for high visibility */
        --on-accent-green: oklch(0% 0 0);

        --accent-blue: oklch(76.5% 0.174 243.6); /* Electric blue */
        --on-accent-blue: oklch(0% 0 0);

        --accent-yellow: oklch(88.5% 0.192 88.6); /* Pure yellow */
        --on-accent-yellow: oklch(0% 0 0);

        --accent-orange: oklch(79.5% 0.192 60.5); /* Vibrant sunset orange */
        --on-accent-orange: oklch(0% 0 0);

        --accent-purple: oklch(66.5% 0.288 310.5); /* Neon purple/violet */
        --on-accent-purple: oklch(0% 0 0);

        --accent-pink: oklch(68.5% 0.245 350.5); /* Hot pink */
        --on-accent-pink: oklch(0% 0 0);

        /* Dark text on white can be slightly heavier */
        --font-weight-primary: 400;
      `,
    })}
  }

  body {
    background-color: var(--surface);
    color: var(--on-surface);
    font-family: var(--font-stack);
    font-weight: var(--font-weight-primary);
    letter-spacing: var(--font-spacing-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
  transition: transform 0.2s, box-shadow 0.2s;

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
