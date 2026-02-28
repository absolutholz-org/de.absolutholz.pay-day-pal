import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tooltip } from ".";

const meta = {
	argTypes: {
		children: {
			control: false,
		},
	},
	component: Tooltip,
	parameters: {
		// Center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	render: (args) => <Tooltip {...args} />,
	tags: ["autodocs"],
	title: "Primitives/Tooltip",
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: <button type="button">Hover or focus me</button>,
		content: "This is a tooltip!",
		position: "top",
	},
};

export const PositionBottom: Story = {
	args: {
		children: <button type="button">Bottom Tooltip</button>,
		content: "I'm on the bottom.",
		position: "bottom",
	},
};

export const PositionLeft: Story = {
	args: {
		children: <button type="button">Left Tooltip</button>,
		content: "I'm on the left.",
		position: "left",
	},
};

export const PositionRight: Story = {
	args: {
		children: <button type="button">Right Tooltip</button>,
		content: "I'm on the right.",
		position: "right",
	},
};

export const WithIconButton: Story = {
	args: {
		children: (
			<button
				type="button"
				aria-label="Settings"
				style={{
					alignItems: "center",
					background: "none",
					border: "none",
					borderRadius: "50%",
					cursor: "pointer",
					display: "inline-flex",
					justifyContent: "center",
					padding: "8px",
				}}
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="3"></circle>
					<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
				</svg>
			</button>
		),
		content: "Settings",
		position: "top",
	},
};
