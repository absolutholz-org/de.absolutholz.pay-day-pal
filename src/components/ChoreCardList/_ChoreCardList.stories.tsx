import type { Meta, StoryObj } from "@storybook/react-vite";

import { DEFAULT_CHORES } from "../../constants";
import { ChoreCardList } from ".";
import { DataProvider } from "../../context/DataContext";

const meta = {
  title: "Components/ChoreCardList",
  component: ChoreCardList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DataProvider>
        <Story />
      </DataProvider>
    ),
  ],
  args: {
    currentMemberId: "child-1",
    currentActivityDate: "2023-10-25",
  },
} satisfies Meta<typeof ChoreCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chores: DEFAULT_CHORES,
    counts: {
      "make-bed": 1,
      "laundry-fold": 2,
    },
    language: "en",
  },
};
