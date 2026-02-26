export interface ISwitch {
	/** Current checked state of the switch */
	checked: boolean;
	/** Callback fired when the state changes */
	onChange: (checked: boolean) => void;
	/** Accessible visible label for the switch */
	label?: React.ReactNode;
	/** Disables the switch */
	disabled?: boolean;
	/** Screen reader only label if a visible `label` prop is not provided */
	"aria-label"?: string;
	/** ID of an external element that labels the switch */
	"aria-labelledby"?: string;
	/** ID for the underlying button element */
	id?: string;
}
