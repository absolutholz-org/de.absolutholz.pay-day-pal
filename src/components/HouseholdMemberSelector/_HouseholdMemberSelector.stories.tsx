import type { Meta, StoryObj } from "@storybook/react-vite";

import { ACCENT_COLORS, HouseholdMember } from "../../types";
import { HouseholdMemberSelector } from "./_HouseholdMemberSelector";

const meta = {
	title: "Components/HouseholdMemberSelector",
	component: HouseholdMemberSelector,

	tags: ["autodocs"],
	argTypes: {
		activeMemberId: { control: "text" },
	},
	args: {
		onSelectMember: () => {},
	},
} satisfies Meta<typeof HouseholdMemberSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMembers: HouseholdMember[] = [
	{ id: "1", name: "Alice", disabled: false, emoji: "👩", color: "red" },
	{ id: "2", name: "Bob", disabled: false, emoji: "👨", color: "blue" },
	{ id: "3", name: "Charlie", disabled: false, emoji: "👦", color: "green" },
];

export const Default: Story = {
	args: {
		members: mockMembers,
		activeMemberId: "1",
	},
};

export const WithDisabledMembers: Story = {
	args: {
		members: [
			...mockMembers,
			{
				id: "4",
				name: "Dave (Disabled)",
				disabled: true,
				emoji: "👴",
				color: "blue",
			},
		],
		activeMemberId: "1",
	},
};

export const ManyMembers: Story = {
	args: {
		members: Array.from({ length: 10 }, (_, i) => ({
			id: `${i}`,
			name: `Member ${i + 1}`,
			disabled: false,
			emoji: "👤",
			color: ACCENT_COLORS[i % ACCENT_COLORS.length],
		})),
		activeMemberId: "0",
	},
};
