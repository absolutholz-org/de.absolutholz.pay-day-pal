import type { Meta, StoryObj } from "@storybook/react-vite";

import { SUPPORTED_LANGUAGES } from "../../constants";
import { LanguageSelector } from ".";

const meta = {
	args: {
		onChange: () => {},
	},
	argTypes: {
		onChange: { action: "onChange" },
	},
	component: LanguageSelector,
	tags: ["autodocs"],
	title: "Components/LanguageSelector",
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		languages: SUPPORTED_LANGUAGES,
		value: "en",
	},
};

export const GermanSelected: Story = {
	args: {
		languages: SUPPORTED_LANGUAGES,
		value: "de",
	},
};
