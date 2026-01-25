import type { Meta, StoryObj } from "@storybook/react-vite";

import { ColorSchemeToggle } from ".";
import { DataProvider } from "../../context/DataContext";
import { LocalizationProvider } from "../../context/LocalizationContext";

const meta = {
  title: "Components/ColorSchemeToggle",
  component: ColorSchemeToggle,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <DataProvider>
        <LocalizationProvider>
          <Story />
        </LocalizationProvider>
      </DataProvider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ColorSchemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
