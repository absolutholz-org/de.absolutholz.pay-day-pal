import type { Meta, StoryObj } from "@storybook/react-vite";

import { useDateFormatter } from "./useDateFormatter";

const UseDateFormatterDemo = ({
	date,
	options,
}: {
	date: string;
	options: Intl.DateTimeFormatOptions;
}) => {
	// Note: This hook requires LocalizationContext to be present.
	const formatter = useDateFormatter(options);
	const dateObj = new Date(date);

	return (
		<div>
			<div style={{ marginBottom: "0.5rem", opacity: 0.7 }}>
				Formatted Date:
			</div>
			<div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
				{formatter.format(dateObj)}
			</div>
		</div>
	);
};

const meta = {
	argTypes: {
		date: { control: "date" },
		options: { control: "object" },
	},
	component: UseDateFormatterDemo,
	tags: ["autodocs"],
	title: "Hooks/useDateFormatter",
} satisfies Meta<typeof UseDateFormatterDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		date: new Date().toISOString(),
		options: {
			day: "numeric",
			month: "long",
			weekday: "long",
		},
	},
};
