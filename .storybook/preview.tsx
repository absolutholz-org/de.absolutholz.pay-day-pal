import { Global } from "@emotion/react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import { themes } from "storybook/theming";

import { SUPPORTED_LANGUAGES } from "../src/constants";
import { DataProvider } from "../src/context/DataContext";
import { LocalizationProvider } from "../src/context/LocalizationContext";
import { globalStyles } from "../src/globalStyles";
import type { Language } from "../src/types";
import { LocalizationWrapper } from "./LocalizationWrapper";

const preview: Preview = {
	decorators: [
		(Story, context) => {
			const { locale, scheme } = context.globals;

			useEffect(() => {
				document.documentElement.setAttribute(
					"data-color-scheme",
					scheme,
				);
			}, [scheme]);

			return (
				<DataProvider>
					<LocalizationProvider>
						<LocalizationWrapper language={locale as Language}>
							<div
								style={{
									color: "var(--text-color)",
								}}
							>
								<Global styles={globalStyles} />
								<Story />
							</div>
						</LocalizationWrapper>
					</LocalizationProvider>
				</DataProvider>
			);
		},
	],
	globalTypes: {
		locale: {
			defaultValue: "en",
			description: "Internationalization locale",
			name: "Locale",
			toolbar: {
				icon: "globe",
				items: SUPPORTED_LANGUAGES.map(({ emoji, label, value }) => ({
					right: emoji,
					title: label,
					value,
				})),
			},
		},
		scheme: {
			defaultValue: "light",
			description: "Select light or dark theme",
			name: "Scheme",
			toolbar: {
				dynamicTitle: true,
				icon: "mirror",
				items: ["light", "dark"],
			},
		},
	},
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			container: ({ children, context }: any) => {
				const { scheme } = context.store.userGlobals.globals;

				// eslint-disable-next-line react-hooks/rules-of-hooks
				useEffect(() => {
					document.documentElement.setAttribute(
						"data-color-scheme",
						scheme,
					);
				}, [scheme]);

				return (
					<DocsContainer
						context={context}
						theme={scheme === "dark" ? themes.dark : themes.light}
					>
						<Global styles={globalStyles} />
						{children}
					</DocsContainer>
				);
			},
		},
		layout: "padded", // Options: 'centered', 'fullscreen', 'padded'
	},
};

export default preview;
