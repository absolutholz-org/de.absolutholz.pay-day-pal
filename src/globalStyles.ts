import { css } from "@emotion/react";

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

	/* SYSTEM COLORS - LIGHT */
	--sys-color-primary: oklch(62.7% 0.265 300);
	--sys-color-primary-hover: oklch(55.0% 0.265 300);
	--sys-color-on-primary: oklch(100% 0 0);
	--sys-color-background: oklch(98.5% 0.002 265);
	--sys-color-on-background: oklch(20.5% 0.042 265);
	--sys-color-surface: oklch(100% 0 0);
	--sys-color-on-surface: oklch(20.5% 0.042 265);
	--sys-color-border: oklch(92.0% 0.006 265);
	--sys-color-focus-ring: oklch(62.7% 0.265 300 / 0.5);
`;

const darkTokens = `
	/* BASE COLORS (Dark Scheme) */ 
	--bg-main:       oklch(20% 0.05 275);     /* Deep Indigo/Purple */
	--text-main:     oklch(98.0% 0 0);        /* White */
	--text-sub:      oklch(70.0% 0.030 265);  /* Slate 400 */

	--card-bg:       oklch(30% 0.06 275);     /* Slightly lighter purple */
	--card-border:   oklch(35.0% 0.050 265);  /* Slate 700 */

	/* We slightly adjust accent lightness for dark mode contrast if needed, 
		but often the same color works if chosen well. */
	--accent:        oklch(65.0% 0.250 300);

	/* Helper for Section */
	--section-bg:    oklch(20% 0.05 275 / 0.5);
	--section-border: oklch(30% 0.06 275);

	/* Dialog Specifics */
	--dialog-bg:        oklch(30% 0.06 275);
	/* Tinted header for Dark Mode (Dark Purple/Slate mix) */
	--dialog-header-bg: oklch(35% 0.08 300); 
	--dialog-overlay:   oklch(10% 0.042 265 / 0.7);
	--title-gradient:   linear-gradient(135deg, oklch(70% 0.265 300) 0%, oklch(75% 0.2 340) 100%);
	--close-btn-hover:  oklch(35% 0.05 265);

	/* SYSTEM COLORS - DARK */
	--sys-color-primary: oklch(65.0% 0.250 300);
	--sys-color-primary-hover: oklch(70.0% 0.250 300);
	--sys-color-on-primary: oklch(100% 0 0);
	--sys-color-background: oklch(20.5% 0.042 265);
	--sys-color-on-background: oklch(98.0% 0 0);
	--sys-color-surface: oklch(27.5% 0.045 265);
	--sys-color-on-surface: oklch(98.0% 0 0);
	--sys-color-border: oklch(35.0% 0.050 265);
	--sys-color-focus-ring: oklch(65.0% 0.250 300 / 0.5);
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

		/* TYPOGRAPHY SCALE */
		--sys-font-size-xs: 0.75rem;
		--sys-font-size-sm: 0.875rem;
		--sys-font-size-base: 1rem;
		--sys-font-size-lg: 1.125rem;
		--sys-font-size-xl: 1.25rem;
		--sys-font-size-2xl: 1.5rem;
		--sys-font-size-3xl: 2rem;

		/* SPACING SCALE */
		--sys-spacing-xs: 0.25rem;
		--sys-spacing-sm: 0.5rem;
		--sys-spacing-md: 1rem;
		--sys-spacing-lg: 1.5rem;
		--sys-spacing-xl: 2rem;
		--sys-spacing-2xl: 3rem;

		/* RADIUS SCALE */
		--sys-radius-sm: 8px;
		--sys-radius-md: 12px;
		--sys-radius-lg: 1.5rem;
		--sys-radius-full: 9999px;

		/* Legacy radius bindings */
		--radius-pill: var(--sys-radius-full);
		--radius-sm: var(--sys-radius-sm);
		--radius-md: var(--sys-radius-md);
		--radius-lg: var(--sys-radius-lg);
		--shadow-color: 0 0 0;

		--page-content-padding: var(--sys-spacing-md);
		--page-content-max-width: 52rem;

		@media screen and (min-width: 600px) {
			--page-content-padding: var(--sys-spacing-2xl);
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

				--accent-blue: oklch(62.3% 0.214 259.815); // Deep Azure
				--accent-green: oklch(72.3% 0.219 149.579); // Vivid Green
				--accent-purple: oklch(62.7% 0.265 303.9); // Deep Violet
				--accent-orange: oklch(70.5% 0.213 47.604); // Burnt Orange
				--accent-red: oklch(63.7% 0.237 25.331); // Crimson Red
				--accent-yellow: oklch(79.5% 0.184 86.047); // Something Yellow
				--accent-pink: oklch(65.6% 0.241 354.308); // Magenta
				--accent-indigo: oklch(71.5% 0.143 215.221); // Cyan-500 from Figma html

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

				--accent-blue: oklch(62.3% 0.214 259.815); // Deep Azure
				--accent-green: oklch(72.3% 0.219 149.579); // Vivid Green
				--accent-purple: oklch(62.7% 0.265 303.9); // Deep Violet
				--accent-orange: oklch(70.5% 0.213 47.604); // Burnt Orange
				--accent-red: oklch(63.7% 0.237 25.331); // Crimson Red
				--accent-yellow: oklch(79.5% 0.184 86.047); // Something Yellow
				--accent-pink: oklch(65.6% 0.241 354.308); // Magenta
				--accent-indigo: oklch(71.5% 0.143 215.221); // Cyan-500 from figma html

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
		border-radius: 0;
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

export const baseInputStyles = css`
	background-color: var(--sys-color-surface);
	border: 2px solid oklch(from var(--sys-color-on-surface) l c h / 0.5);
	border-radius: var(--sys-radius-sm);
	color: var(--sys-color-on-surface);
	font-family: inherit;
	font-size: var(--sys-font-size-base);
	margin-bottom: var(--sys-spacing-md);
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	width: 100%;

	&:focus {
		border-color: oklch(from var(--sys-color-on-surface) l c h / 0.85);
		outline: none;
	}
`;
