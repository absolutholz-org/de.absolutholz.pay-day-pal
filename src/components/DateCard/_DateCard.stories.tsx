import type { Meta, StoryObj } from "@storybook/react-vite";

import { DateCard } from "./_DateCard";

const meta = {
	args: {
		onClick: () => {},
	},
	argTypes: {
		dailyTotal: { control: "number" },
		date: { control: "date" },
		isActive: { control: "boolean" },
		isToday: { control: "boolean" },
	},

	component: DateCard,
	tags: ["autodocs"],
	title: "Components/DateCard",
} satisfies Meta<typeof DateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		dailyTotal: 12.5,
		date: new Date("2023-10-25"),
		isActive: false,
		isToday: false,
	},
};

export const Active: Story = {
	args: {
		dailyTotal: 12.5,
		date: new Date("2023-10-25"),
		isActive: true,
		isToday: false,
	},
};

export const Today: Story = {
	args: {
		dailyTotal: 5.0,
		date: new Date(),
		isActive: false,
		isToday: true,
	},
};

export const ZeroEarnings: Story = {
	args: {
		dailyTotal: 0,
		date: new Date("2023-10-25"),
		isActive: false,
		isToday: false,
	},
};
