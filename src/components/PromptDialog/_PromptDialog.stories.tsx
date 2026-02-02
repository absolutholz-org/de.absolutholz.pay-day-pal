import type { Meta, StoryObj } from "@storybook/react-vite";

import { PromptDialog } from "./_PromptDialog";

const meta = {
  title: "Components/PromptDialog",
  component: PromptDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
  },
  args: {
    onConfirm: (value) => console.log("Confirmed with:", value),
    onCancel: () => console.log("Cancelled"),
  },
} satisfies Meta<typeof PromptDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Enter Name",
    message: "Please enter your name below:",
    inputPlaceholder: "John Doe",
  },
};

export const WithDefaultValue: Story = {
  args: {
    isOpen: true,
    title: "Edit Email",
    message: "Update your email address:",
    defaultValue: "user@example.com",
    confirmLabel: "Save",
  },
};
