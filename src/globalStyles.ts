import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { colorSchemeCss } from "./_colorSchemeCss";

const lightTokens = `
  /* BASE COLORS */
  --bg-main:       oklch(98.5% 0.002 265);  /* Slate 50 */
  --text-main:     oklch(20.5% 0.042 265);  /* Slate 900 */
  --text-sub:      oklch(55.0% 0.025 265);  /* Slate 500 */
  
  --card-bg:       oklch(100% 0 0);         /* White */
  --card-border:   oklch(92.0% 0.006 265);  /* Slate 200 */
  
  --accent:        oklch(62.7% 0.265 300);  /* Purple 500 */
  
  /* Helper for Section */
  --section-bg:    oklch(100% 0 0);
  --section-border: oklch(98.5% 0.002 265);

  /* Dialog Specifics */
  --dialog-bg:        oklch(100% 0 0);
  /* Tinted header for Light Mode (Subtle Purple) */
  --dialog-header-bg: oklch(98% 0.01 300); 
  --dialog-overlay:   oklch(20.5% 0.042 265 / 0.4);
  --title-gradient:   linear-gradient(135deg, oklch(62.7% 0.265 300) 0%, oklch(65% 0.25 340) 100%);
  --close-btn-hover:  oklch(96% 0.01 265); 
`;

const darkTokens = `
  /* BASE COLORS (Dark Scheme) */ 
  --bg-main:       oklch(20.5% 0.042 265);  /* Slate 900 */
  --text-main:     oklch(98.0% 0 0);        /* White */
  --text-sub:      oklch(70.0% 0.030 265);  /* Slate 400 */
  
  --card-bg:       oklch(27.5% 0.045 265);  /* Slate 800 */
  --card-border:   oklch(35.0% 0.050 265);  /* Slate 700 */
  
  /* We slightly adjust accent lightness for dark mode contrast if needed, 
     but often the same color works if chosen well. */
  --accent:        oklch(65.0% 0.250 300);
  
  /* Helper for Section */
  --section-bg:    oklch(20.5% 0.042 265 / 0.5);
  --section-border: oklch(27.5% 0.045 265);

  /* Dialog Specifics */
  --dialog-bg:        oklch(25% 0.045 265);
  /* Tinted header for Dark Mode (Dark Purple/Slate mix) */
  --dialog-header-bg: oklch(30% 0.06 300); 
  --dialog-overlay:   oklch(10% 0.042 265 / 0.7);
  --title-gradient:   linear-gradient(135deg, oklch(70% 0.265 300) 0%, oklch(75% 0.2 340) 100%);
  --close-btn-hover:  oklch(35% 0.05 265);
`;

export const globalStyles = css`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:root {
		${lightTokens}
	}

	@media (prefers-color-scheme: dark) {
		:root {
			${darkTokens}
		}
	}

	[data-color-scheme="light"] {
		${lightTokens}
	}

	[data-color-scheme="dark"] {
		${darkTokens}
	}

	:root {
		--font-stack:
			"Avenir Next", "Avenir", "Century Gothic", "Segoe UI", Roboto,
			Helvetica, Arial, sans-serif;
		--font-spacing-primary: 0.05em;

		--radius-pill: calc(infinity * 1px);
		--shadow-color: 0 0 0;

		--page-content-padding: 1rem;
		--page-content-max-width: 52rem;

		@media screen and (max-width: 600px) {
			--page-content-padding: 3rem;
		}

		color: var(--on-surface);
		color-scheme: light dark;
		container-name: page;
		container-type: scroll-state;
		font-family: var(--font-stack);
		font-weight: var(--font-weight-primary);
		letter-spacing: var(--font-spacing-primary);
		line-height: 1.5;
		min-height: 100vh;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body {
		${colorSchemeCss({
			darkCssVars: css`
				/* Night Scheme (Black Background) */
				--surface: oklch(0% 0 0);
				--surface-2: oklch(0.278 0.033 256.848);

				--on-surface: oklch(0.707 0.022 261.325);
				--on-surface-2: oklch(0.928 0.006 264.531);
				--on-surface-3: oklch(0.872 0.01 258.338);

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
			lightCssVars: css`
				/* Day Scheme (Light Background) */
				--surface: oklch(100% 0 0);
				--surface-2: oklch(98.5% 0.002 247.8);

				--on-surface: oklch(0.446 0.03 256.802);
				--on-surface-2: oklch(0.373 0.034 259.733);
				--on-surface-3: oklch(0.551 0.027 264.364);

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
		})}
		background-attachment: fixed;
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

export const baseInputStyles = css`
	background-color: var(--surface);
	border: 2px solid oklch(from var(--on-surface) l c h / 0.5);
	border-radius: 8px;
	color: var(--on-surface);
	font-family: inherit;
	font-size: 1rem;
	margin-bottom: 1rem;
	padding: 0.75rem;
	width: 100%;

	&:focus {
		border-color: oklch(from var(--on-surface) l c h / 0.85);
		outline: none;
	}
`;
