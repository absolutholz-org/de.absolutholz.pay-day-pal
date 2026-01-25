import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChoreCard } from ".";
import { DataProvider } from "../../context/DataContext";

const meta = {
  title: "Components/ChoreCard",
  component: ChoreCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <DataProvider>
        <Story />
      </DataProvider>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    count: { control: "number" },
  },
  args: {
    currentMemberId: "storybook-child",
    currentActivityDate: "2024-01-01",
  },
} satisfies Meta<typeof ChoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "laundry-fold",
    category: "kitchen",
    label: "Wash Dishes",
    value: 1.5,
    count: 0,
  },
};

export const Active: Story = {
  args: {
    id: "make-bed",
    category: "bedroom",
    label: "Make Bed",
    value: 0.25,
    count: 3,
  },
};
