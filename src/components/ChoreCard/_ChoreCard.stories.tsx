import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataProvider } from "../../context/DataContext";
import { ChoreCard } from ".";

const meta = {
	args: {
		currentActivityDate: "2024-01-01",
		currentMemberId: "storybook-child",
	},
	argTypes: {
		count: { control: "number" },
	},

	component: ChoreCard,
	decorators: [
		(Story) => (
			<DataProvider>
				<Story />
			</DataProvider>
		),
	],
	tags: ["autodocs"],
	title: "Components/ChoreCard",
} satisfies Meta<typeof ChoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		category: "kitchen",
		count: 0,
		id: "laundry-fold",
		label: "Wash Dishes",
		value: 1.5,
	},
};

export const Active: Story = {
	args: {
		category: "bedroom",
		count: 3,
		id: "make-bed",
		label: "Make Bed",
		value: 0.25,
	},
};
