import type { Meta, StoryObj } from "@storybook/react-vite";

import { FullBleedScrollableContainer } from ".";

const meta = {
	argTypes: {},
	component: FullBleedScrollableContainer,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "Primitives/FullBleedScrollableContainer",
} satisfies Meta<typeof FullBleedScrollableContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				{Array.from({ length: 10 }).map((_, i) => (
					<div
						key={i}
						style={{
							alignItems: "center",
							backgroundColor: "#e0e0e0",
							borderRadius: "8px",
							display: "flex",
							flexShrink: 0,
							height: "7.5rem",
							justifyContent: "center",
							width: "10rem",
						}}
					>
						Item {i + 1}
					</div>
				))}
			</>
		),
	},
};
