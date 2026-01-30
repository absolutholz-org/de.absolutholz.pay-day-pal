import type { Meta, StoryObj } from "@storybook/react-vite";

import { ACCENT_COLORS } from "../../types";
import { HouseholdMemberPill } from "./_HouseholdMemberPill";

const meta = {
  title: "Components/HouseholdMemberPill",
  component: HouseholdMemberPill,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    emoji: { control: "text" },
    color: { control: "select", options: ACCENT_COLORS },
  },
} satisfies Meta<typeof HouseholdMemberPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Alice",
    emoji: "👩",
    color: "red",
    isActive: false,
  },
};

export const Small: Story = {
  args: {
    name: "Alice",
    emoji: "👩",
    color: "red",
    isActive: false,
    size: "small",
  },
};

export const Active: Story = {
  args: {
    name: "Bob",
    emoji: "👨",
    color: "blue",
    isActive: true,
  },
};
