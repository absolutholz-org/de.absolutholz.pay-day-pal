import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import { ConfettiBurst } from "./_ConfettiBurst";

const meta = {
  title: "Components/ConfettiBurst",
  component: ConfettiBurst,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfettiBurst>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
      if (trigger) {
        const timeout = setTimeout(() => setTrigger(false), 2000);
        return () => clearTimeout(timeout);
      }
    }, [trigger]);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <button
          onClick={() => setTrigger(true)}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
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
