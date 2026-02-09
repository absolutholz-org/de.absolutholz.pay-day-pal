import type { Meta, StoryObj } from "@storybook/react-vite";

import { HouseholdMemberEditorRow } from "./_HouseholdMemberEditorRow";

const meta = {
	title: "Components/HouseholdMemberEditorRow",
	component: HouseholdMemberEditorRow,

	tags: ["autodocs"],
} satisfies Meta<typeof HouseholdMemberEditorRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		member: {
			id: "1",
			name: "Alice",
			emoji: "👩",
			color: "red",
			disabled: false,
		},
		// onUpdate: (id, data) => console.log("Update", id, data),
		// onToggleStatus: (id) => console.log("Toggle Status", id),
		// disableConfirmLabel: "Disable {name}?",
	},
};

export const Disabled: Story = {
	args: {
		member: {
			id: "2",
			name: "Bob",
			emoji: "👨",
			color: "blue",
			disabled: true,
		},
		// onUpdate: (id, data) => console.log("Update", id, data),
		// onToggleStatus: (id) => console.log("Toggle Status", id),
	},
};
