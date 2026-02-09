import type { Meta, StoryObj } from "@storybook/react-vite";
import { CurrencySelector } from "./_CurrencySelector";

const meta = {
	title: "Components/CurrencySelector",
	component: CurrencySelector,
	tags: ["autodocs"],
	argTypes: {
		onChange: { action: "onChange" },
	},
} satisfies Meta<typeof CurrencySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: "EUR",
		onChange: () => {},
	},
};
