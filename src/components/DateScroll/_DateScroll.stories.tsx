import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateScroll } from ".";
import { formatDateKey } from "../../utils";

const today = new Date();
const dates = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() - 7 + i);
  return date;
});

const meta = {
  title: "Components/DateScroll",
  component: DateScroll,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onDateSelect: (date) => console.log("Selected date:", date),
    getDailyTotal: (date) => (date.getDate() % 2 === 0 ? 15.5 : 0),
  },
} satisfies Meta<typeof DateScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dates: dates,
    selectedDate: formatDateKey(today),
  },
};
