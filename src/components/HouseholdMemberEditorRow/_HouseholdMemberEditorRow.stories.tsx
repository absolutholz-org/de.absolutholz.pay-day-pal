import type { Meta, StoryObj } from "@storybook/react-vite";

import { HouseholdMemberEditorRow } from "./_HouseholdMemberEditorRow";

const meta = {
	component: HouseholdMemberEditorRow,
	tags: ["autodocs"],

	title: "Components/HouseholdMemberEditorRow",
} satisfies Meta<typeof HouseholdMemberEditorRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		member: {
			color: "red",
			disabled: false,
			emoji: "👩",
			id: "1",
			name: "Alice",
		},
		// onUpdate: (id, data) => console.log("Update", id, data),
		// onToggleStatus: (id) => console.log("Toggle Status", id),
		// disableConfirmLabel: "Disable {name}?",
	},
};

export const Disabled: Story = {
	args: {
		member: {
			color: "blue",
			disabled: true,
			emoji: "👨",
			id: "2",
			name: "Bob",
		},
		// onUpdate: (id, data) => console.log("Update", id, data),
		// onToggleStatus: (id) => console.log("Toggle Status", id),
	},
};
