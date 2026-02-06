import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioCardGroup } from ".";

const meta = {
  title: "Components/RadioCardGroup",
  component: RadioCardGroup,
  tags: ["autodocs"],
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof RadioCardGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
  {
    value: "1",
    label: "Option 1",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    value: "2",
    label: "Option 2",
    icon: "📦",
  },
  {
    value: "3",
    label: "Option 3",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export const Default: Story = {
  args: {
    label: "Select a Card",
    name: "card-group",
    options: mockOptions,
    selectedValue: "1",
  },
};
