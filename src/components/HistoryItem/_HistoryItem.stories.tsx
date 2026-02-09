import type { Meta, StoryObj } from "@storybook/react-vite";

import { HistoryItem } from ".";

const meta = {
	argTypes: {
		emoji: { control: "text" },
	},
	component: HistoryItem,

	tags: ["autodocs"],
	title: "Components/HistoryItem",
} satisfies Meta<typeof HistoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		amountCompleted: 1,
		amountEarned: 5.0,
		emoji: "🧹",
		title: "Clean Room",
		// householdMember: "Alex",
	},
};

export const HighValue: Story = {
	args: {
		amountCompleted: 1,
		amountEarned: 20.0,
		emoji: "🌱",
		title: "Mow Lawn",
		// householdMember: "Sam",
	},
};
