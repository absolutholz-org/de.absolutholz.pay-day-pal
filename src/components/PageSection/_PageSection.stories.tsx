import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageSection } from "./_PageSection";

const meta: Meta<typeof PageSection> = {
  component: PageSection,
  tags: ["autodocs"],
  title: "Components/PageSection",
};

export default meta;

type Story = StoryObj<typeof PageSection>;

export const Default: Story = {
  args: {
    children: "This is the content of the page section.",
    headline: "Section Headline",
  },
};

export const WithoutHeadline: Story = {
  args: {
    children: "This section has no headline.",
  },
};
