import type { Meta, StoryObj } from "@storybook/react-vite";

import { HouseholdMember } from "../../types";
import { HouseholdMemberListEditor } from "./_HouseholdMemberListEditor";

const meta = {
  title: "Components/HouseholdMemberListEditor",
  component: HouseholdMemberListEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HouseholdMemberListEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMembers: HouseholdMember[] = [
  { id: "1", name: "Alice", disabled: false, emoji: "👩", color: "red" },
  { id: "2", name: "Bob", disabled: false, emoji: "👨", color: "blue" },
  { id: "3", name: "Charlie", disabled: true, emoji: "👦", color: "green" },
];

export const Default: Story = {
  args: {
    members: mockMembers,
    onAddMember: (name, emoji, color) => console.log("Add", name, emoji, color),
    onUpdateMember: (id, data) => console.log("Update", id, data),
    onToggleMemberStatus: (id) => console.log("Toggle", id),
    labels: {
      newMemberNamePlaceholder: "New Member Name",
      disableConfirm: "Disable {name}?",
      addMember: "Add Member",
    },
  },
};
