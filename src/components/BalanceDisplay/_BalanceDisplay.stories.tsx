import type { Meta, StoryObj } from "@storybook/react-vite";

import { BalanceDisplay } from "./_BalanceDisplay";

const meta = {
	title: "Components/BalanceDisplay",
	component: BalanceDisplay,

	tags: ["autodocs"],
	argTypes: {
		total: { control: "number" },
	},
} satisfies Meta<typeof BalanceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		total: 42.5,
	},
};

export const Zero: Story = {
	args: {
		total: 0,
	},
};

export const LargeAmount: Story = {
	args: {
		total: 1234.56,
	},
};
