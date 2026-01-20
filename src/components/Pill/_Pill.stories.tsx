import type { Meta, StoryObj } from "@storybook/react-vite";

import { Pill } from ".";

const meta: Meta<typeof Pill> = {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
    onClick: { action: "clicked" },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    children: "Small Pill",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Pill",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Large Pill",
    size: "large",
  },
};

export const SmallWithLeadingSlot: Story = {
  args: {
    children: "Small Pill",
    size: "small",
    slotLead: "🚀",
  },
};

export const SmallWithTrailingSlot: Story = {
  args: {
    children: "Small Pill",
    size: "small",
    slotTrail: "🔥",
  },
};

export const MediumWithTrailingSlot: Story = {
  args: {
    children: "Medium Pill",
    size: "medium",
    slotTrail: "🔥",
  },
};

export const LargeWithTrailingSlot: Story = {
  args: {
    children: "Large Pill",
    size: "large",
    slotTrail: "🔥",
  },
};

export const MediumWithLeadingSlot: Story = {
  args: {
    children: "Medium Pill",
    size: "medium",
    slotLead: "🚀",
  },
};

export const LargeWithLeadingSlot: Story = {
  args: {
    children: "Large Pill",
    size: "large",
    slotLead: "🚀",
  },
};
