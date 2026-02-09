import type { Meta, StoryObj } from "@storybook/react-vite";

import { ACCENT_COLORS, type HouseholdMember } from "../../types";
import { HouseholdMemberSelector } from "./_HouseholdMemberSelector";

const meta = {
	args: {
		onSelectMember: () => {},
	},
	argTypes: {
		activeMemberId: { control: "text" },
	},

	component: HouseholdMemberSelector,
	tags: ["autodocs"],
	title: "Components/HouseholdMemberSelector",
} satisfies Meta<typeof HouseholdMemberSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMembers: HouseholdMember[] = [
	{ color: "red", disabled: false, emoji: "👩", id: "1", name: "Alice" },
	{ color: "blue", disabled: false, emoji: "👨", id: "2", name: "Bob" },
	{ color: "green", disabled: false, emoji: "👦", id: "3", name: "Charlie" },
];

export const Default: Story = {
	args: {
		activeMemberId: "1",
		members: mockMembers,
	},
};

export const WithDisabledMembers: Story = {
	args: {
		activeMemberId: "1",
		members: [
			...mockMembers,
			{
				color: "blue",
				disabled: true,
				emoji: "👴",
				id: "4",
				name: "Dave (Disabled)",
			},
		],
	},
};

export const ManyMembers: Story = {
	args: {
		activeMemberId: "0",
		members: Array.from({ length: 10 }, (_, i) => ({
			color: ACCENT_COLORS[i % ACCENT_COLORS.length],
			disabled: false,
			emoji: "👤",
			id: `${i}`,
			name: `Member ${i + 1}`,
		})),
	},
};
