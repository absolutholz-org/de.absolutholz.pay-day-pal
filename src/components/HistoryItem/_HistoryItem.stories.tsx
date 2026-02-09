import type { Meta, StoryObj } from "@storybook/react-vite";

import { HistoryItem } from ".";

const meta = {
	title: "Components/HistoryItem",
	component: HistoryItem,

	tags: ["autodocs"],
	argTypes: {
		emoji: { control: "text" },
	},
} satisfies Meta<typeof HistoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Clean Room",
		emoji: "🧹",
		amountCompleted: 1,
		amountEarned: 5.0,
		// householdMember: "Alex",
	},
};

export const HighValue: Story = {
	args: {
		title: "Mow Lawn",
		emoji: "🌱",
		amountCompleted: 1,
		amountEarned: 20.0,
		// householdMember: "Sam",
	},
};
