import type { Meta, StoryObj } from "@storybook/react-vite";

import { ColorSchemeToggle } from ".";
import { DataProvider } from "../../context/DataContext";

const meta = {
	title: "Components/ColorSchemeToggle",
	component: ColorSchemeToggle,

	decorators: [
		(Story) => (
			<DataProvider>
				<Story />
			</DataProvider>
		),
	],
	tags: ["autodocs"],
} satisfies Meta<typeof ColorSchemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
