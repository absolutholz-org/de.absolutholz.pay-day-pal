import type { Meta, StoryObj } from "@storybook/react-vite";

import { ConfirmDialog } from "./_ConfirmDialog";

const meta = {
	args: {
		isOpen: true,
		onCancel: () => console.log("Cancelled"),
		onConfirm: () => console.log("Confirmed"),
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "danger", "secondary"],
		},
	},

	component: ConfirmDialog,
	tags: ["autodocs"],
	title: "Primitives/Dialog/Variants/ConfirmDialog",
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		message: "Are you sure you want to proceed?",
		title: "Confirm Action",
	},
};

export const Danger: Story = {
	args: {
		confirmLabel: "Delete",
		message: "This action cannot be undone.",
		title: "Delete Item",
		variant: "danger",
	},
};

export const WithChildren: Story = {
	args: {
		children: (
			<div
				style={{
					backgroundColor: "rgba(0,0,0,0.05)",
					borderRadius: "8px",
					marginTop: "1rem",
					padding: "1rem",
				}}
			>
				<strong>Details:</strong>
				<ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
					<li>Item 1</li>
					<li>Item 2</li>
				</ul>
			</div>
		),
		message: "Please review the details below:",
		title: "Custom Content",
	},
};
