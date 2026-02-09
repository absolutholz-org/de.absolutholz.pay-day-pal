import type { Meta, StoryObj } from "@storybook/react-vite";

import { BalanceDisplay } from "./_BalanceDisplay";

const meta = {
	argTypes: {
		total: { control: "number" },
	},
	component: BalanceDisplay,

	tags: ["autodocs"],
	title: "Components/BalanceDisplay",
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
