import { forwardRef, type SelectHTMLAttributes } from "react";

import * as S from "./_Select.styles";

export interface SelectOption {
	value: string | number;
	label: string;
}

export interface SelectProps extends Omit<
	SelectHTMLAttributes<HTMLSelectElement>,
	"children"
> {
	options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ options, ...props }, ref) => {
		return (
			<S.Select ref={ref} {...props}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</S.Select>
		);
	},
);

Select.displayName = "Select";
