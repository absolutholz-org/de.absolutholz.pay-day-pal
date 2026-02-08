import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from ".";

const meta = {
  title: "Primitives/Input",
  component: Input,

  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text here...",
  },
};

export const WithValue: Story = {
  args: {
    value: "Some value",
    readOnly: true,
  },
};
