import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./_Button";

const meta = {
  title: "Primitives/Button/Variants/Text",
  component: Button,

  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "text",
    color: "primary",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Text Button",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "small",
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
    children: <span>🚀</span>,
    "aria-label": "Icon Only",
  },
};
