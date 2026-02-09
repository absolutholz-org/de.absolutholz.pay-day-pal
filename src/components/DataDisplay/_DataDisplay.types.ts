import { ReactNode } from "react";

export interface DataDisplayProps {
	label: string;
	icon?: ReactNode;
	children: ReactNode;
	onEdit?: () => void;
	editLabel?: string;
}
