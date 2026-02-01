import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dialog } from "./_Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    footer: { control: "text" },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Example Dialog",
    children: "This is the content of the dialog.",
    footer: "Dialog Footer",
    onClose: () => console.log("Close dialog"),
  },
};

export const WithButtons: Story = {
  args: {
    isOpen: true,
    title: "Dialog with Actions",
    children: "Do you want to proceed?",
    footer: (
      <div
        style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}
      >
        <button onClick={() => console.log("Cancel")}>Cancel</button>
        <button onClick={() => console.log("Confirm")}>Confirm</button>
      </div>
    ),
    onClose: () => console.log("Close dialog"),
  },
};
