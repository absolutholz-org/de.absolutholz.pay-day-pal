import type { Meta, StoryObj } from "@storybook/react-vite";

import { RadioCardGroup } from ".";

const meta = {
	args: {
		onChange: () => {},
	},
	component: RadioCardGroup,
	tags: ["autodocs"],
	title: "Primitives/RadioCardGroup",
} satisfies Meta<typeof RadioCardGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
	{
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
			</svg>
		),
		label: "Option 1",
		value: "1",
	},
	{
		icon: "📦",
		label: "Option 2",
		value: "2",
	},
	{
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
			</svg>
		),
		label: "Option 3",
		value: "3",
	},
];

export const Default: Story = {
	args: {
		initialValue: "1",
		name: "card-group",
		options: mockOptions,
	},
};
