import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeft, Settings } from "lucide-react";

import { PageHeader } from "./_PageHeader";

const meta = {
	argTypes: {
		slotLead: { control: false },
		slotMain: { control: false },
		slotTrail: { control: false },
		title: { control: "text" },
	},
	component: PageHeader,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "Components/PageHeader",
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
		slotMain: (
			<div style={{ color: "#7f8c8d" }}>Track chores and earn!</div>
		),
		title: "Household Name",
	},
};

export const WithNavigation: Story = {
	args: {
		slotLead: <ArrowLeft size={24} />,
		title: "Settings",
	},
};

export const WithActions: Story = {
	args: {
		slotTrail: <Settings size={24} />,
		title: "Dashboard",
	},
};

export const Full: Story = {
	args: {
		slotLead: <ArrowLeft size={24} />,
		slotMain: <div style={{ color: "#7f8c8d" }}>With all slots filled</div>,
		slotTrail: <Settings size={24} />,
		title: "Full Header",
	},
};
