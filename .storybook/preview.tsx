import { Global } from "@emotion/react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";
import { useEffect } from "react";

import { globalStyles } from "../src/globalStyles";
import { DataProvider } from "../src/context/DataContext";
import { LocalizationProvider } from "../src/context/LocalizationContext";

const preview: Preview = {
	globalTypes: {
		scheme: {
			name: "Scheme",
			description: "Select light or dark theme",
			defaultValue: "light",
			toolbar: {
				icon: "mirror",
				items: ["light", "dark"],
				dynamicTitle: true,
			},
		},
	},
	decorators: [
		(Story, context) => {
			const { scheme } = context.globals;

			useEffect(() => {
				document.documentElement.setAttribute(
					"data-color-scheme",
					scheme,
				);
			}, [scheme]);

			return (
				<DataProvider>
					<LocalizationProvider>
						<Global styles={globalStyles} />
						<Story />
					</LocalizationProvider>
				</DataProvider>
			);
		},
	],
	parameters: {
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
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: "padded", // Options: 'centered', 'fullscreen', 'padded'
	},
};

export default preview;
