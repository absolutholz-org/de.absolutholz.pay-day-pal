import { useId } from "react";

import * as S from "./_Switch.styled";
import { type ISwitch } from "./_Switch.types";

export function Switch({
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledBy,
	checked,
	disabled = false,
	id,
	label,
	onChange,
}: ISwitch) {
	// Generate stable IDs for label-to-button association if none are provided
	const fallbackId = useId();
	const switchId = id || `switch-${fallbackId}`;
	const labelId = `label-${fallbackId}`;

	const handleClick = () => {
		if (!disabled) {
			onChange(!checked);
		}
	};

	// Accessibility safeguard: Warn developers if no accessible name is provided
	const hasAccessibleName = label || ariaLabel || ariaLabelledBy;
	if (!hasAccessibleName) {
		console.warn(
			"Switch requires an accessible name. Provide a `label`, `aria-label`, or `aria-labelledby` prop.",
		);
	}

	return (
		<S.Switch $disabled={disabled}>
			<S.Switch_Track
				type="button"
				role="switch"
				id={switchId}
				aria-checked={checked}
				aria-disabled={disabled}
				aria-label={ariaLabel}
				// If a visible label is provided, use its ID. Otherwise, fallback to an external labelledby prop.
				aria-labelledby={label ? labelId : ariaLabelledBy}
				$checked={checked}
				disabled={disabled}
				onClick={handleClick}
			>
				<S.Switch_Thumb $checked={checked} aria-hidden="true" />
			</S.Switch_Track>

			{label && (
				<S.Switch_LabelText
					id={labelId}
					htmlFor={switchId}
					$disabled={disabled}
				>
					{label}
				</S.Switch_LabelText>
			)}
		</S.Switch>
	);
}
