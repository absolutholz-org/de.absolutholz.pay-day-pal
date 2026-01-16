import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfirmationDialog } from "./_ConfirmationDialog";

const meta = {
  title: "Components/ConfirmationDialog",
  component: ConfirmationDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "danger", "secondary"],
    },
  },
  args: {
    isOpen: true,
    onConfirm: () => console.log("Confirmed"),
    onCancel: () => console.log("Cancelled"),
  },
} satisfies Meta<typeof ConfirmationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Confirm Action",
    message: "Are you sure you want to proceed?",
  },
};

export const Danger: Story = {
  args: {
    title: "Delete Item",
    message: "This action cannot be undone.",
    confirmLabel: "Delete",
    variant: "danger",
  },
};

export const WithChildren: Story = {
  args: {
    title: "Custom Content",
    message: "Please review the details below:",
    children: (
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "8px",
        }}
      >
        <strong>Details:</strong>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    ),
  },
};
