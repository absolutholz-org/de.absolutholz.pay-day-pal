import type { Meta, StoryObj } from "@storybook/react-vite";

import { PromptDialog } from "./_PromptDialog";

const meta = {
  title: "Primitives/Dialog/Variants/PromptDialog",
  component: PromptDialog,

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

export const WithOptions: Story = {
  args: {
    isOpen: true,
    title: "Select Option",
    message: "Choose an option:",
    defaultValue: "option2",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};
