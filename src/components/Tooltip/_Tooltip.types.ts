import { type ReactNode } from "react";

export type Size = "small" | "medium" | "large";
export type ColorVariant = "neutral" | "green" | "red" | "yellow" | "blue";
export type ButtonVariant = "filled" | "outlined" | "tonal" | "text";

export interface ITooltip {
	/** The text or content to display in the tooltip */
	content?: string | ReactNode;
	/** Preferred position of the tooltip relative to the child */
	position?: "top" | "right" | "bottom" | "left";
	/** The single child element to attach the tooltip to */
	children: React.ReactElement;
}
