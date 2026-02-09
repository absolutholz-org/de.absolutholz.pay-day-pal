import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageHeadline } from ".";

const meta = {
	component: PageHeadline,
	tags: ["autodocs"],

	title: "Components/PageHeadline",
} satisfies Meta<typeof PageHeadline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Page Headline",
	},
};
