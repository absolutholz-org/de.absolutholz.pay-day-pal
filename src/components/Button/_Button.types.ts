import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "filled" | "outline";
	color?: "primary" | "secondary" | "success" | "danger" | "warning";
	size?: "small" | "medium" | "large";
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	isLoading?: boolean;
	fullWidth?: boolean;
}
