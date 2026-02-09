import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dialog } from "./_Dialog";

const meta = {
	argTypes: {
		children: { control: "text" },
		footer: { control: "text" },
	},
	component: Dialog,

	tags: ["autodocs"],
	title: "Primitives/Dialog",
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "This is the content of the dialog.",
		footer: "Dialog Footer",
		isOpen: true,
		onClose: () => console.log("Close dialog"),
		title: "Example Dialog",
	},
};

export const WithButtons: Story = {
	args: {
		children: "Do you want to proceed?",
		footer: (
			<div
				style={{
					display: "flex",
					gap: "0.5rem",
					justifyContent: "flex-end",
				}}
			>
				<button onClick={() => console.log("Cancel")}>Cancel</button>
				<button onClick={() => console.log("Confirm")}>Confirm</button>
			</div>
		),
		isOpen: true,
		onClose: () => console.log("Close dialog"),
		title: "Dialog with Actions",
	},
};
