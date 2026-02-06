// /home/unix/home/workspaces/de.absolutholz.pay-day-pal/src/components/Label/_Label.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from ".";

const meta = {
  title: "Components/Label",
  component: Label,

  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label Text",
  },
};
