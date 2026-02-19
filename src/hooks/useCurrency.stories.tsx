import type { Meta, StoryObj } from "@storybook/react-vite";

import { useCurrency } from "./useCurrency";

const UseCurrencyDemo = ({
	amount,
	currency,
	locale,
}: {
	amount: number;
	currency: "USD" | "EUR";
	locale: string;
}) => {
	const formatted = useCurrency(amount, locale, currency);
	return (
		<div
			style={{
				background: "#f0f0f0",
				borderRadius: "8px",
				padding: "1rem",
				width: "fit-content",
			}}
		>
			<div style={{ fontSize: "0.875rem", opacity: 0.7 }}>
				Formatted Value
			</div>
			<div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
				{formatted}
			</div>
		</div>
	);
};

const meta = {
	argTypes: {
		amount: { control: "number" },
		currency: { control: "text" },
		locale: { control: "text" },
	},
	component: UseCurrencyDemo,
	tags: ["autodocs"],
	title: "Hooks/useCurrency",
} satisfies Meta<typeof UseCurrencyDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Euro: Story = {
	args: {
		amount: 1234.56,
		currency: "EUR",
		locale: "de-DE",
	},
};

export const USDollar: Story = {
	args: {
		amount: 1234.56,
		currency: "USD",
		locale: "en-US",
	},
};
