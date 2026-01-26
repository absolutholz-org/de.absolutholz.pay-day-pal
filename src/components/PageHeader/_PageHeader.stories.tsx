import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeft, Settings } from "lucide-react";

import { PageHeader } from "./_PageHeader";

const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    slotLead: { control: false },
    slotMain: { control: false },
    slotTrail: { control: false },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Page Title",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Household Name",
    slotMain: <div style={{ color: "#7f8c8d" }}>Track chores and earn!</div>,
  },
};

export const WithNavigation: Story = {
  args: {
    title: "Settings",
    slotLead: <ArrowLeft size={24} />,
  },
};

export const WithActions: Story = {
  args: {
    title: "Dashboard",
    slotTrail: <Settings size={24} />,
  },
};

export const Full: Story = {
  args: {
    title: "Full Header",
    slotLead: <ArrowLeft size={24} />,
    slotMain: <div style={{ color: "#7f8c8d" }}>With all slots filled</div>,
    slotTrail: <Settings size={24} />,
  },
};
