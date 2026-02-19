import type { Meta, StoryObj } from "@storybook/react-vite";

import { useMember } from "./useMember";

const UseMemberDemo = ({ memberId }: { memberId: string }) => {
	// Note: This hook requires DataContext to be present.
	const member = useMember(memberId);

	if (!member) {
		return <div>Member not found or Context missing</div>;
	}

	return (
		<div
			style={{
				alignItems: "center",
				background: "#f8f9fa",
				borderRadius: "12px",
				display: "flex",
				gap: "1rem",
				padding: "1rem",
				width: "fit-content",
			}}
		>
			<div style={{ fontSize: "2rem" }}>{member.emoji}</div>
			<div>
				<div style={{ fontWeight: "bold" }}>{member.name}</div>
				<div style={{ color: member.color }}>{member.color}</div>
			</div>
		</div>
	);
};

const meta = {
	argTypes: {
		memberId: { control: "text" },
	},
	component: UseMemberDemo,
	tags: ["autodocs"],
	title: "Hooks/useMember",
} satisfies Meta<typeof UseMemberDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		memberId: "member-1",
	},
};
