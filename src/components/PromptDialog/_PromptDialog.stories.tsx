import type { Meta, StoryObj } from "@storybook/react-vite";

import { PromptDialog } from "./_PromptDialog";

const meta = {
	args: {
		onCancel: () => console.log("Cancelled"),
		onConfirm: (value) => console.log("Confirmed with:", value),
	},
	argTypes: {
		message: { control: "text" },
	},

	component: PromptDialog,
	tags: ["autodocs"],
	title: "Primitives/Dialog/Variants/PromptDialog",
} satisfies Meta<typeof PromptDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		inputPlaceholder: "John Doe",
		isOpen: true,
		message: "Please enter your name below:",
		title: "Enter Name",
	},
};

export const WithDefaultValue: Story = {
	args: {
		confirmLabel: "Save",
		defaultValue: "user@example.com",
		isOpen: true,
		message: "Update your email address:",
		title: "Edit Email",
	},
};

export const WithOptions: Story = {
	args: {
		defaultValue: "option2",
		isOpen: true,
		message: "Choose an option:",
		options: [
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", value: "option2" },
			{ label: "Option 3", value: "option3" },
		],
		title: "Select Option",
	},
};
