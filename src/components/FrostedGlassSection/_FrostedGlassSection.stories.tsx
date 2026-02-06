import type { Meta, StoryObj } from "@storybook/react-vite";

import { FrostedGlassSection } from ".";

const meta = {
  title: "Components/FrostedGlassSection",
  component: FrostedGlassSection,
  tags: ["autodocs"],
} satisfies Meta<typeof FrostedGlassSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: "Section Headline",
    children: "This is the content of the frosted glass section.",
  },
};

export const NoHeadline: Story = {
  args: {
    children: "This section does not have a headline.",
  },
};

export const WithComplexContent: Story = {
  args: {
    headline: "Complex Content",
    children: <p>You can put any content here.</p>,
  },
};
