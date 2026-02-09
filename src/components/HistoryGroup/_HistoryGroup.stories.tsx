import type { Meta, StoryObj } from "@storybook/react-vite";

import { HistoryGroup } from ".";

const meta = {
	argTypes: {
		emoji: { control: "text" },
	},
	component: HistoryGroup,

	tags: ["autodocs"],
	title: "Components/HistoryGroup",
} satisfies Meta<typeof HistoryGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		amountEarned: 15.5,
		emoji: "📅",
		items: [
			{ color: "red", emoji: "🧹", id: "1", name: "Clean Room" },
			{ color: "green", emoji: "🌱", id: "2", name: "Mow Lawn" },
			{ color: "blue", emoji: "🍽️", id: "3", name: "Wash Dishes" },
		],
		subTitle: "3 activities",
		title: "Today",
	},
};
