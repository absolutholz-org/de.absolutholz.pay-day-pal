import type { Meta, StoryObj } from "@storybook/react-vite";

import { formatDateKey } from "../../utils";
import { DateScroll } from ".";

const today = new Date();
const dates = Array.from({ length: 14 }, (_, i) => {
	const date = new Date(today);
	date.setDate(today.getDate() - 7 + i);
	return date;
});

const meta = {
	args: {
		getDailyTotal: (date) => (date.getDate() % 2 === 0 ? 15.5 : 0),
		onDateSelect: (date) => console.log("Selected date:", date),
	},
	component: DateScroll,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "Components/DateScroll",
} satisfies Meta<typeof DateScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		dates: dates,
		selectedDate: formatDateKey(today),
	},
};
