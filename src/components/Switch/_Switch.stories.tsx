import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import { Switch } from "./_Switch";

const meta = {
	args: {
		onChange: () => {},
	},
	argTypes: {
		onChange: { action: "onChange" },
	},
	component: Switch,
	parameters: {
		layout: "centered",
	},
	render: function Render(args) {
		const [checked, setChecked] = useState(args.checked);

		useEffect(() => {
			setChecked(args.checked);
		}, [args.checked]);

		return (
			<Switch
				{...args}
				checked={checked}
				onChange={(isChecked) => {
					setChecked(isChecked);
					args.onChange(isChecked);
				}}
			/>
		);
	},
	tags: ["autodocs"],
	title: "Primitives/Switch",
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		checked: false,
		label: "Toggle me",
	},
};

export const Checked: Story = {
	args: {
		checked: true,
		label: "Checked state",
	},
};

export const Disabled: Story = {
	args: {
		checked: false,
		disabled: true,
		label: "Disabled state",
	},
};

export const DisabledChecked: Story = {
	args: {
		checked: true,
		disabled: true,
		label: "Disabled & Checked",
	},
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Settings",
		checked: false,
	},
};
