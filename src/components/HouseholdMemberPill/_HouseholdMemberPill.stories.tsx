import type { Meta, StoryObj } from "@storybook/react-vite";

import { ACCENT_COLORS } from "../../types";
import { HouseholdMemberPill } from "./_HouseholdMemberPill";

const meta = {
	argTypes: {
		color: { control: "select", options: ACCENT_COLORS },
		emoji: { control: "text" },
	},
	component: HouseholdMemberPill,

	tags: ["autodocs"],
	title: "Components/HouseholdMemberPill",
} satisfies Meta<typeof HouseholdMemberPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "red",
		emoji: "👩",
		isActive: false,
		name: "Alice",
	},
};

export const Small: Story = {
	args: {
		color: "red",
		emoji: "👩",
		isActive: false,
		name: "Alice",
		size: "small",
	},
};

export const Active: Story = {
	args: {
		color: "blue",
		emoji: "👨",
		isActive: true,
		name: "Bob",
	},
};
