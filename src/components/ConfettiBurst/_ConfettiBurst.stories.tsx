import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import { ConfettiBurst } from "./_ConfettiBurst";

const meta = {
	component: ConfettiBurst,
	tags: ["autodocs"],

	title: "Components/ConfettiBurst",
} satisfies Meta<typeof ConfettiBurst>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		trigger: false,
	},
};

export const Interactive: Story = {
	args: {
		trigger: false,
	},
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [trigger, setTrigger] = useState(false);

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			if (trigger) {
				const timeout = setTimeout(() => setTrigger(false), 2000);
				return () => clearTimeout(timeout);
			}
		}, [trigger]);

		return (
			<div
				style={{
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					gap: "2rem",
				}}
			>
				<button
					onClick={() => setTrigger(true)}
					style={{
						cursor: "pointer",
						fontSize: "16px",
						padding: "10px 20px",
					}}
				>
					Trigger Burst
				</button>
				<div style={{ position: "relative" }}>
					<ConfettiBurst trigger={trigger} />
				</div>
			</div>
		);
	},
};
