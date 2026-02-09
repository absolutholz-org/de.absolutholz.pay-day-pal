import type { Meta, StoryObj } from "@storybook/react-vite";

import { FrostedGlassSection } from ".";

const meta = {
	component: FrostedGlassSection,
	tags: ["autodocs"],
	title: "Components/FrostedGlassSection",
} satisfies Meta<typeof FrostedGlassSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "This is the content of the frosted glass section.",
		headline: "Section Headline",
	},
};

export const NoHeadline: Story = {
	args: {
		children: "This section does not have a headline.",
	},
};

export const WithComplexContent: Story = {
	args: {
		children: <p>You can put any content here.</p>,
		headline: "Complex Content",
	},
};
