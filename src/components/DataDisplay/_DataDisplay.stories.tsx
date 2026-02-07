import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataDisplay } from ".";

const meta = {
  title: "Components/DataDisplay",
  component: DataDisplay,
  tags: ["autodocs"],
  argTypes: {
    onEdit: { action: "onEdit" },
  },
} satisfies Meta<typeof DataDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    data: "Data value",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Currency",
    data: "Euro",
    icon: "💶",
  },
};

export const WithEditAction: Story = {
  args: {
    label: "Household Name",
    data: "My Household",
    editLabel: "Edit Name",
    onEdit: () => {},
  },
};
