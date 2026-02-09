import type { Meta, StoryObj } from "@storybook/react-vite";

import { type HouseholdMember } from "../../types";
import { HouseholdMemberListEditor } from "./_HouseholdMemberListEditor";

const meta = {
	component: HouseholdMemberListEditor,
	tags: ["autodocs"],

	title: "Components/HouseholdMemberListEditor",
} satisfies Meta<typeof HouseholdMemberListEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMembers: HouseholdMember[] = [
	{ color: "red", disabled: false, emoji: "👩", id: "1", name: "Alice" },
	{ color: "blue", disabled: false, emoji: "👨", id: "2", name: "Bob" },
	{ color: "green", disabled: true, emoji: "👦", id: "3", name: "Charlie" },
];

export const Default: Story = {
	args: {
		labels: {
			addMember: "Add Member",
			disableConfirm: "Disable {name}?",
			newMemberNamePlaceholder: "New Member Name",
		},
		members: mockMembers,
		onAddMember: (name, emoji, color) =>
			console.log("Add", name, emoji, color),
		onToggleMemberStatus: (id) => console.log("Toggle", id),
		onUpdateMember: (id, data) => console.log("Update", id, data),
	},
};
