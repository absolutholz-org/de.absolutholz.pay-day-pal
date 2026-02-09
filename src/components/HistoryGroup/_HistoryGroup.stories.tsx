import type { Meta, StoryObj } from "@storybook/react-vite";

import { HistoryGroup } from ".";

const meta = {
	title: "Components/HistoryGroup",
	component: HistoryGroup,

	tags: ["autodocs"],
	argTypes: {
		emoji: { control: "text" },
	},
} satisfies Meta<typeof HistoryGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Today",
		subTitle: "3 activities",
		amountEarned: 15.5,
		emoji: "📅",
		items: [
			{ id: "1", name: "Clean Room", emoji: "🧹", color: "red" },
			{ id: "2", name: "Mow Lawn", emoji: "🌱", color: "green" },
			{ id: "3", name: "Wash Dishes", emoji: "🍽️", color: "blue" },
		],
	},
};
