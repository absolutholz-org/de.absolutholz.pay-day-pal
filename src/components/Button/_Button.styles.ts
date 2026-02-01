import { css, keyframes, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";

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
  primary: {
    gradient: "linear-gradient(to right, #a855f7, #ec4899)", // purple-500 to pink-500
    solid: "#a855f7",
    shadow: "rgba(168, 85, 247, 0.4)",
  },
  secondary: {
    gradient: "linear-gradient(to right, #3b82f6, #06b6d4)", // blue-500 to cyan-500
    solid: "#3b82f6",
    shadow: "rgba(59, 130, 246, 0.4)",
  },
  success: {
    gradient: "linear-gradient(to right, #22c55e, #10b981)", // green-500 to emerald-500
    solid: "#22c55e",
    shadow: "rgba(34, 197, 94, 0.4)",
  },
  danger: {
    gradient: "linear-gradient(to right, #ef4444, #f43f5e)", // red-500 to rose-500
    solid: "#ef4444",
    shadow: "rgba(239, 68, 68, 0.4)",
  },
  warning: {
    gradient: "linear-gradient(to right, #eab308, #f97316)", // yellow-500 to orange-500
    solid: "#eab308",
    shadow: "rgba(234, 179, 8, 0.4)",
  },
};

const SIZES: Record<ButtonSize, SerializedStyles> = {
  small: css`
    border-radius: 12px;
    font-size: 0.875rem; /* text-sm */
    height: 2.5625rem;
    padding: 8px 16px;
  `,
  medium: css`
    border-radius: 12px;
    font-size: 1rem;
    height: 3rem;
    padding: 10px 20px;
  `,
  large: css`
    border-radius: 16px;
    font-size: 1.125rem; /* text-lg */
    height: 3.4375rem;
    padding: 12px 24px;
  `,
};

// --- Helper Functions for Dynamic Styles ---

const getVariantStyles = ({
  variant,
  colorScheme,
}: {
  variant: ButtonVariant;
  colorScheme: ButtonColor;
}) => {
  const theme = COLORS[colorScheme];

  if (variant === "outlined") {
    return css`
      background: transparent;
      border: 2px solid ${theme.solid};
      color: ${theme.solid};
      box-shadow: none;

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
      color: ${theme.solid};
      box-shadow: none;

      &:hover:not(:disabled) {
        background: ${theme.solid}1a; /* 10% opacity hex */
      }
    `;
  }

  // Default to 'contained'
  return css`
    background: ${theme.gradient};
    border: none;
    color: white;
    box-shadow:
      0 10px 15px -3px ${theme.shadow},
      0 4px 6px -2px rgba(0, 0, 0, 0.05);

    &:hover:not(:disabled) {
      /* Brighten filter to simulate the '600' hover state in gradients */
      filter: brightness(1.1);
      box-shadow:
        0 20px 25px -5px ${theme.shadow},
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  `;
};

export const Button = styled.button<ButtonProps>`
  /* Base Styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
      variant: props.variant as ButtonVariant,
      colorScheme: props.color as ButtonColor,
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
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Spinner = styled.div`
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: ${spin} 0.6s linear infinite;
`;
