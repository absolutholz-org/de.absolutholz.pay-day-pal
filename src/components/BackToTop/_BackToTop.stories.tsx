import type { Meta, StoryObj } from "@storybook/react-vite";

import { BackToTop } from ".";

const meta = {
  title: "Components/BackToTop",
  component: BackToTop,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BackToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Back to top",
  },
  render: (args) => (
    <div style={{ height: "300vh", padding: "2rem" }}>
      <h1>Scroll down to see the BackToTop button</h1>
      <p>
        The button uses CSS <code>animation-timeline: scroll()</code> to appear
        when you scroll down.
      </p>
      <BackToTop {...args} />
    </div>
  ),
};
