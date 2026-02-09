import type { Meta, StoryObj } from "@storybook/react-vite";

import { CurrencySelector } from "./_CurrencySelector";

const meta = {
	argTypes: {
		onChange: { action: "onChange" },
	},
	component: CurrencySelector,
	tags: ["autodocs"],
	title: "Components/CurrencySelector",
} satisfies Meta<typeof CurrencySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onChange: () => {},
		value: "EUR",
	},
};
