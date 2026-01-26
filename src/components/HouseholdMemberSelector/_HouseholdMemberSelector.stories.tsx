import type { Meta, StoryObj } from "@storybook/react-vite";

import { HouseholdMemberSelector } from "./_HouseholdMemberSelector";

const meta = {
  title: "Components/HouseholdMemberSelector",
  component: HouseholdMemberSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    activeMemberId: { control: "text" },
  },
  args: {
    onSelectMember: () => {},
  },
} satisfies Meta<typeof HouseholdMemberSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMembers = [
  { id: "1", name: "Alice", disabled: false },
  { id: "2", name: "Bob", disabled: false },
  { id: "3", name: "Charlie", disabled: false },
];

export const Default: Story = {
  args: {
    members: mockMembers,
    activeMemberId: "1",
  },
};

export const WithDisabledMembers: Story = {
  args: {
    members: [
      ...mockMembers,
      { id: "4", name: "Dave (Disabled)", disabled: true },
    ],
    activeMemberId: "1",
  },
};

export const ManyMembers: Story = {
  args: {
    members: Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      name: `Member ${i + 1}`,
      disabled: false,
    })),
    activeMemberId: "0",
  },
};
