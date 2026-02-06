import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from ".";

const meta = {
  title: "Components/Select",
  component: Select,

  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};
