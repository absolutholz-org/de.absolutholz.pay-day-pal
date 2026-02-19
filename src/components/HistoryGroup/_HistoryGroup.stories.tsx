import type { Meta, StoryObj } from "@storybook/react-vite";

import { HistoryGroup_ByDay } from ".";

const meta = {
	argTypes: {},
	component: HistoryGroup_ByDay,

	tags: ["autodocs"],
	title: "Components/HistoryGroup",
} satisfies Meta<typeof HistoryGroup_ByDay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		activities: [
			{
				choreId: "hang-laundry",
				choreLabel: "Hang Laundry",
				createdAt: new Date(),
				date: new Date("2026-01-01"),
				id: "one",
				memberId: "",
				value: 0,
			},
		],
		date: "2026-01-01",
	},
};
