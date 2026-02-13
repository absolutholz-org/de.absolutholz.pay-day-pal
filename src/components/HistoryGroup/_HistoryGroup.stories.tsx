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
		items: [
			{
				icon: "🍽️",
				meta: "Completed 2 times",
				price: "€2.00",
				title: "Do Dishes",
			},
			{
				icon: "👕",
				meta: "Completed 2 times",
				price: "€1.50",
				title: "Fold Laundry",
			},
			{
				icon: "🗑️",
				meta: "Completed 1 time",
				price: "€0.50",
				title: "Take Out Trash",
			},
			{
				icon: "🛏️",
				meta: "Completed 5 times",
				price: "€2.50",
				title: "Make Bed",
			},
		],
		member: {
			color: "blue",
			icon: "🚀",
			name: "Nicky",
			stats: "7 chore types",
			total: "€11.25",
		},
	},
};
