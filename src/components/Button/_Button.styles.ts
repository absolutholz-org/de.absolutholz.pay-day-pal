import { css, keyframes, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "contained" | "outlined" | "text";
	color?: "primary" | "secondary" | "success" | "danger" | "warning";
	size?: "small" | "medium" | "large";
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	isLoading?: boolean;
	fullWidth?: boolean;
	as?: React.ElementType;
	to?: string;
	href?: string;
	label?: string;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// --- Configuration Maps ---

type ButtonColor = NonNullable<ButtonProps["color"]>;
type ButtonSize = NonNullable<ButtonProps["size"]>;
type ButtonVariant = NonNullable<ButtonProps["variant"]>;

const COLORS: Record<
	ButtonColor,
	{ gradient: string; solid: string; shadow: string }
> = {
	danger: {
		gradient: "linear-gradient(to right, #ef4444, #f43f5e)", // red-500 to rose-500
		shadow: "rgba(239, 68, 68, 0.4)",
		solid: "#ef4444",
	},
	primary: {
		gradient: "linear-gradient(to right, #a855f7, #ec4899)", // purple-500 to pink-500
		shadow: "rgba(168, 85, 247, 0.4)",
		solid: "#a855f7",
	},
	secondary: {
		gradient: "linear-gradient(to right, #3b82f6, #06b6d4)", // blue-500 to cyan-500
		shadow: "rgba(59, 130, 246, 0.4)",
		solid: "#3b82f6",
	},
	success: {
		gradient: "linear-gradient(to right, #22c55e, #10b981)", // green-500 to emerald-500
		shadow: "rgba(34, 197, 94, 0.4)",
		solid: "#22c55e",
	},
	warning: {
		gradient: "linear-gradient(to right, #eab308, #f97316)", // yellow-500 to orange-500
		shadow: "rgba(234, 179, 8, 0.4)",
		solid: "#eab308",
	},
};

const SIZES: Record<ButtonSize, SerializedStyles> = {
	large: css`
		border-radius: var(--sys-radius-lg);
		font-size: var(--sys-font-size-lg);
		height: 3.4375rem;
		padding: var(--sys-spacing-md) var(--sys-spacing-lg);
	`,
	medium: css`
		border-radius: var(--sys-radius-md);
		font-size: var(--sys-font-size-base);
		height: 3rem;
		padding: var(--sys-spacing-sm) var(--sys-spacing-lg);
	`,
	small: css`
		border-radius: var(--sys-radius-md);
		font-size: var(--sys-font-size-sm);
		height: 2.5625rem;
		padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	`,
};

// --- Helper Functions for Dynamic Styles ---

const getVariantStyles = ({
	colorScheme,
	variant,
}: {
	variant: ButtonVariant;
	colorScheme: ButtonColor;
}) => {
	const theme = COLORS[colorScheme];

	if (variant === "outlined") {
		return css`
			background: transparent;
			border: 2px solid ${theme.solid};
			box-shadow: none;
			color: ${theme.solid};

			&:hover:not(:disabled) {
				background: ${theme.solid}1a; /* 10% opacity hex */
				border-color: ${theme.solid};
			}
		`;
	}

	if (variant === "text") {
		return css`
			background: transparent;
			border: 2px solid transparent;
			box-shadow: none;
			color: ${theme.solid};

			&:hover:not(:disabled) {
				background: ${theme.solid}1a; /* 10% opacity hex */
			}
		`;
	}

	// Default to 'contained'
	return css`
		background: ${theme.gradient};
		border: none;
		box-shadow:
			0 10px 15px -3px ${theme.shadow},
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		color: white;

		&:hover:not(:disabled) {
			box-shadow:
				0 20px 25px -5px ${theme.shadow},
				0 10px 10px -5px rgba(0, 0, 0, 0.04);
			/* Brighten filter to simulate the '600' hover state in gradients */
			filter: brightness(1.1);
		}
	`;
};

export const Button = styled.button<ButtonProps>`
	/* Base Styles */
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: var(--sys-spacing-sm);
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	outline: none;
	text-decoration: none;

	/* Full Width Prop */
	width: ${(props) => (props.fullWidth ? "100%" : "auto")};

	/* Dynamic Size */
	${(props) => SIZES[props.size as ButtonSize]}

	/* Dynamic Variant & Color */
  ${(props) =>
		getVariantStyles({
			colorScheme: props.color as ButtonColor,
			variant: props.variant as ButtonVariant,
		})}

  /* Active Press Animation */
  &:active:not(:disabled) {
		transform: scale(0.95);
	}

	/* Hover Scale Animation */
	&:hover:not(:disabled) {
		transform: scale(1.05);
	}

	/* Disabled State */
	&:disabled {
		box-shadow: none;
		cursor: not-allowed;
		opacity: 0.5;
		transform: none;
	}
`;

export const Spinner = styled.div`
	animation: ${spin} 0.6s linear infinite;
	border: 2px solid currentColor;
	border-radius: var(--sys-radius-full);
	border-top-color: transparent;
	height: 1em;
	width: 1em;
`;
