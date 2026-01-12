import type { Meta, StoryObj } from "@storybook/react-vite";

import { ColorSchemeToggle } from "./_ColorSchemeToggle";

const meta = {
  title: "Components/ColorSchemeToggle",
  component: ColorSchemeToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ColorSchemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
