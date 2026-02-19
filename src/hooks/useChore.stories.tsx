import type { Meta, StoryObj } from "@storybook/react-vite";

import { useChore } from "./useChore";

const UseChoreDemo = ({ choreId }: { choreId: string }) => {
	// Note: This hook requires DataContext and LocalizationContext to be present.
	const chore = useChore(choreId);

	if (!chore) {
		return <div>Chore not found or Context missing</div>;
	}

	return (
		<div
			style={{
				border: `2px solid ${chore.color}`,
				borderRadius: "8px",
				padding: "1rem",
				width: "300px",
			}}
		>
			<div style={{ fontSize: "2rem" }}>{chore.emoji}</div>
			<div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
				{chore.label}
			</div>
			<div>Value: {chore.value}</div>
			<div>Frequency: {chore.frequency}</div>
		</div>
	);
};

const meta = {
	argTypes: {
		choreId: { control: "text" },
	},
	component: UseChoreDemo,
	tags: ["autodocs"],
	title: "Hooks/useChore",
} satisfies Meta<typeof UseChoreDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		choreId: "make-bed",
	},
};
