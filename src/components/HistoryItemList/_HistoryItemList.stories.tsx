import type { Meta, StoryObj } from "@storybook/react-vite";

import { HistoryItemList } from "./_HistoryItemList";

const meta = {
	component: HistoryItemList,
	tags: ["autodocs"],
	title: "Contextual/History/HistoryItemList",
} satisfies Meta<typeof HistoryItemList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<div
					style={{
						background: "rgba(0, 0, 0, 0.05)",
						borderRadius: "8px",
						padding: "1rem",
					}}
				>
					List Item 1
				</div>
				<div
					style={{
						background: "rgba(0, 0, 0, 0.05)",
						borderRadius: "8px",
						padding: "1rem",
					}}
				>
					List Item 2
				</div>
				<div
					style={{
						background: "rgba(0, 0, 0, 0.05)",
						borderRadius: "8px",
						padding: "1rem",
					}}
				>
					List Item 3
				</div>
			</>
		),
	},
};
