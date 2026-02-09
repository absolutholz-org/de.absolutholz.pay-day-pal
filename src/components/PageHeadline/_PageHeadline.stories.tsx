import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageHeadline } from ".";

const meta = {
	title: "Components/PageHeadline",
	component: PageHeadline,

	tags: ["autodocs"],
} satisfies Meta<typeof PageHeadline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Page Headline",
	},
};
