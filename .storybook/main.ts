import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
	],

	framework: {
		name: "@storybook/react-vite",
		options: {},
	},

	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
};
export default config;
