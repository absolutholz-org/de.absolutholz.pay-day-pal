import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import { ChoreCard } from ".";

const meta = {
  title: "Components/ChoreCard",
  component: ChoreCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: { control: "number" },
  },
  args: {
    onIncrement: () => {},
    onDecrement: () => {},
  },
  render: function Render(args) {
    const [{ count }, updateArgs] = useArgs();

    return (
      <ChoreCard
        {...args}
        count={count}
        onIncrement={() => updateArgs({ count: count + 1 })}
        onDecrement={() => updateArgs({ count: Math.max(0, count - 1) })}
      />
    );
  },
} satisfies Meta<typeof ChoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: "kitchen",
    label: "Wash Dishes",
    value: 1.5,
    count: 0,
  },
};

export const Active: Story = {
  args: {
    category: "bedroom",
    label: "Make Bed",
    value: 0.25,
    count: 3,
  },
};
