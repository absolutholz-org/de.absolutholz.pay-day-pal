import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./_Button";

const meta = {
	args: {
		color: "primary",
		variant: "contained",
	},
	argTypes: {
		children: { control: "text" },
		disabled: { control: "boolean" },
		fullWidth: { control: "boolean" },
		isLoading: { control: "boolean" },
		size: {
			control: "select",
			options: ["small", "medium", "large"],
		},
	},

	component: Button,
	tags: ["autodocs"],
	title: "Primitives/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Contained Button",
	},
};

export const Small: Story = {
	args: {
		children: "Small Button",
		size: "small",
	},
};

export const Medium: Story = {
	args: {
		children: "Medium Button",
		size: "medium",
	},
};

export const Large: Story = {
	args: {
		children: "Large Button",
		size: "large",
	},
};

export const Loading: Story = {
	args: {
		children: "Loading",
		isLoading: true,
	},
};

export const Disabled: Story = {
	args: {
		children: "Disabled",
		disabled: true,
	},
};

export const WithIcon: Story = {
	args: {
		children: "With Icon",
		startIcon: <span>🚀</span>,
	},
};

export const IconOnly: Story = {
	args: {
		"aria-label": "Icon Only",
		children: <span>🚀</span>,
	},
};
