import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataDisplay } from ".";

const meta = {
	argTypes: {
		onEdit: { action: "onEdit" },
	},
	component: DataDisplay,
	tags: ["autodocs"],
	title: "Components/DataDisplay",
} satisfies Meta<typeof DataDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Data value",
		label: "Label",
	},
};

export const WithIcon: Story = {
	args: {
		children: "Euro",
		icon: "💶",
		label: "Currency",
	},
};

export const WithEditAction: Story = {
	args: {
		children: "My Household",
		editLabel: "Edit Name",
		label: "Household Name",
		onEdit: () => {},
	},
};
