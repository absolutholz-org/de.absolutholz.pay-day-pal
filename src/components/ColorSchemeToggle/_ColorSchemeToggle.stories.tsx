import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataProvider } from "../../context/DataContext";
import { ColorSchemeToggle } from ".";

const meta = {
	component: ColorSchemeToggle,
	decorators: [
		(Story) => (
			<DataProvider>
				<Story />
			</DataProvider>
		),
	],

	tags: ["autodocs"],
	title: "Components/ColorSchemeToggle",
} satisfies Meta<typeof ColorSchemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
