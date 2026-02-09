import type { Meta, StoryObj } from "@storybook/react-vite";

import { DEFAULT_CHORES } from "../../constants/constants";
import { DataProvider } from "../../context/DataContext";
import { ChoreCardList } from ".";

const meta = {
	args: {
		currentActivityDate: "2023-10-25",
		currentMemberId: "child-1",
	},
	component: ChoreCardList,
	decorators: [
		(Story) => (
			<DataProvider>
				<Story />
			</DataProvider>
		),
	],
	tags: ["autodocs"],
	title: "Components/ChoreCardList",
} satisfies Meta<typeof ChoreCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		chores: DEFAULT_CHORES,
		counts: {
			"laundry-fold": 2,
			"make-bed": 1,
		},
		language: "en",
	},
};
