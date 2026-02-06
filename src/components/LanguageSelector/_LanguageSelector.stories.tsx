import type { Meta, StoryObj } from "@storybook/react-vite";

import { SUPPORTED_LANGUAGES } from "../../constants";
import { LanguageSelector } from ".";

const meta = {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" },
  },
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    languages: SUPPORTED_LANGUAGES,
    value: "en",
  },
};

export const GermanSelected: Story = {
  args: {
    languages: SUPPORTED_LANGUAGES,
    value: "de",
  },
};
