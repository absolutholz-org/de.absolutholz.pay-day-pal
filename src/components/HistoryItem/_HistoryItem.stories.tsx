import type { Meta, StoryObj } from "@storybook/react-vite";

import { HistoryItem } from ".";

const meta = {
	argTypes: {
		icon: { control: "text" },
	},
	component: HistoryItem,

	tags: ["autodocs"],
	title: "Components/HistoryItem",
} satisfies Meta<typeof HistoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		amountEarned: 5.0,
		date: new Date("2026-02-13"),
		icon: "👕",
		member: {
			color: "green",
			emoji: "🥑",
			id: "vroni",
			name: "Vroni",
		},
		title: "Clean Room",
	},
};
