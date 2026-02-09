import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from ".";

const meta = {
	component: Input,
	tags: ["autodocs"],

	title: "Primitives/Input",
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter text here...",
	},
};

export const WithValue: Story = {
	args: {
		readOnly: true,
		value: "Some value",
	},
};
