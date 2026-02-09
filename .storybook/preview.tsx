import { Global } from "@emotion/react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import { themes } from "storybook/theming";

import { DataProvider } from "../src/context/DataContext";
import { LocalizationProvider } from "../src/context/LocalizationContext";
import { globalStyles } from "../src/globalStyles";

const preview: Preview = {
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
	globalTypes: {
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
