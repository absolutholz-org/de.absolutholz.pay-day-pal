import type { Meta, StoryObj } from "@storybook/react-vite";

import { DateCard } from "./_DateCard";

const meta = {
  title: "Components/DateCard",
  component: DateCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    date: { control: "date" },
    isActive: { control: "boolean" },
    isToday: { control: "boolean" },
    dailyTotal: { control: "number" },
  },
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof DateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date("2023-10-25"),
    isActive: false,
    isToday: false,
    dailyTotal: 12.5,
  },
};

export const Active: Story = {
  args: {
    date: new Date("2023-10-25"),
    isActive: true,
    isToday: false,
    dailyTotal: 12.5,
  },
};

export const Today: Story = {
  args: {
    date: new Date(),
    isActive: false,
    isToday: true,
    dailyTotal: 5.0,
  },
};
