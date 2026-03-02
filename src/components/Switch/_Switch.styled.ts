import styled from "@emotion/styled";

export const Switch = styled.div<{ $disabled?: boolean }>`
	display: inline-flex;
	align-items: center;
	gap: var(--sys-spacing-md);
	/* Dim the entire component if disabled */
	opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const Switch_Track = styled.button<{ $checked: boolean }>`
	position: relative;
	width: 48px;
	height: 28px;
	border-radius: var(--radius-pill);
	border: none;
	/* Colors carefully chosen for 3:1+ UI contrast ratio */
	background-color: ${({ $checked }) => ($checked ? "var(--sys-color-primary)" : "var(--sys-color-border)")};
	cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
	padding: 0;
	transition: background-color 0.2s ease-in-out;
	flex-shrink: 0;

	/* WCAG 2.4.7 Focus Visible: Ensure highly visible focus ring */
	&:focus-visible {
		outline: 3px solid var(--sys-color-primary);
		outline-offset: 3px;
	}

	/* High Contrast Mode / Windows Forced Colors support */
	@media (forced-colors: active) {
		border: 2px solid transparent;
	}
`;

export const Switch_Thumb = styled.span<{ $checked: boolean }>`
	position: absolute;
	top: 2px;
	left: 2px;
	width: 24px;
	height: 24px;
	border-radius: var(--radius-pill);
	background-color: #ffffff;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	/* Move thumb 20px to the right when checked (48px total width - 24px thumb - 4px horizontal padding) */
	transform: ${({ $checked }) =>
		$checked ? "translateX(20px)" : "translateX(0)"};
`;

export const Switch_LabelText = styled.label<{ $disabled?: boolean }>`
	font-family:
		system-ui,
		-apple-system,
		sans-serif;
	font-size: var(--sys-font-size-base);
	color: var(--sys-color-on-surface);
	cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
	/* Prevent text highlighting when user clicks the label rapidly */
	user-select: none;
`;
