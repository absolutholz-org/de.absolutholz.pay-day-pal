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

    color-scheme: light dark;
    ${colorSchemeCss({
      lightCssVars: css`
        /* Day Scheme (Light Background) */
        --bg-primary: #ffffff;
        --text-primary: #1a1a1a;
        --text-secondary: #4a4a4a;

        /* Accent Colors (Optimized for AA compliance on White) */
        --accent-red: #d32f2f; /* Increased depth for contrast */
        --accent-green: #2e7d32; /* Darkened to pass on white */
        --accent-blue: #1976d2; /* Standard accessible blue */
        --accent-yellow: #f57f17; /* Shifted toward amber to be visible on white */
        --accent-orange: #e65100; /* Deep orange for legibility */
        --accent-purple: #7b1fa2; /* Royal purple */
        --accent-pink: #c2185b; /* Deep magenta */

        /* Thin text often needs a slight weight boost on dark backgrounds to stay readable */
        --font-weight-primary: 300;
      `,
      darkCssVars: css`
        /* Night Scheme (Black Background) */
        --bg-primary: #000000;
        --text-primary: #ffffff;
        --text-secondary: #b3b3b3;

        /* Accent Colors (Optimized for AA compliance on Black) */
        --accent-red: #ff5252; /* Brighter for "glow" effect */
        --accent-green: #69f0ae; /* Neon green for high visibility */
        --accent-blue: #40c4ff; /* Electric blue */
        --accent-yellow: #ffd740; /* Pure yellow */
        --accent-orange: #ffab40; /* Vibrant sunset orange */
        --accent-purple: #e040fb; /* Neon purple/violet */
        --accent-pink: #ff4081; /* Hot pink */

        /* Dark text on white can be slightly heavier */
        --font-weight-primary: 400;
      `,
    })}
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
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
`;

// App.tsx styles
export const Container = styled.div`
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;
`;

export const IconButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #95a5a6;
  transition: color 0.2s;
  padding: 0.5rem;

  &:hover {
    color: #2c3e50;
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
  color: #3498db;
  animation: spin 1s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  display: flex;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  color: #7f8c8d;
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
  background-color: ${(props) => (props.active ? "#3498db" : "#ecf0f1")};
  color: ${(props) => (props.active ? "white" : "#7f8c8d")};
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background-color: ${(props) => (props.active ? "#2980b9" : "#bdc3c7")};
  }
`;

export const BalanceDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  border: 1px solid #ecf0f1;
`;

export const BalanceLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const BalanceValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
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
  background: ${(props) => (props.active ? "#2c3e50" : "white")};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: 1px solid ${(props) => (props.active ? "#2c3e50" : "#ecf0f1")};
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

export const ChoreList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #ecf0f1;
`;

export const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #ecf0f1;
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
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

export const CardMeta = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// SettingsScreen.tsx styles
export const SettingsPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fdfcfb;
  z-index: 1000;
  overflow-y: auto;
`;

export const SettingsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

export const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-top: 1rem;
`;

export const SettingsTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0.25rem;

  &:hover {
    color: #2c3e50;
  }
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HistoryItem = styled.div`
  background: white;
  border: 1px solid #ecf0f1;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3498db;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const HistoryDateRange = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

export const ActivityGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const ActivityDateHeader = styled.h4`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.25rem;
`;

export const ActivityRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

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
  background: white;
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
  color: #2c3e50;
  font-size: 1.25rem;
`;

export const ModalText = styled.p`
  color: #7f8c8d;
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
      ? "#e74c3c"
      : props.variant === "secondary"
      ? "#ecf0f1"
      : "#3498db"};
  color: ${(props) => (props.variant === "secondary" ? "#7f8c8d" : "white")};

  &:hover {
    background-color: ${(props) =>
      props.variant === "danger"
        ? "#c0392b"
        : props.variant === "secondary"
        ? "#bdc3c7"
        : "#2980b9"};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #bdc3c7;
  font-size: 1rem;
  font-family: inherit;
  color: #2c3e50;
  background-color: white;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: inherit;

  &:hover {
    background-color: #c0392b;
  }
`;
