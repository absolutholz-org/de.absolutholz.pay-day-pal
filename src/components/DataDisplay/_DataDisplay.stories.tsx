import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataDisplay } from "./_DataDisplay";

const meta = {
  title: "Components/DataDisplay",
  component: DataDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    data: "Data Value",
  },
};

export const WithEdit: Story = {
  args: {
    label: "Label",
    data: "Data Value",
    onEdit: () => console.log("Edit clicked"),
    editLabel: "Modify Value",
  },
};
