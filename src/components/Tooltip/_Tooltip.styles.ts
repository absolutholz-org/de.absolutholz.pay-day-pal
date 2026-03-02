import styled from "@emotion/styled";

export const Tooltip = styled.div`
	margin: 0;
	padding: var(--sys-spacing-xs) var(--sys-spacing-md);
	background-color: var(--sys-color-on-surface); /* slate-800 approx */
	color: var(--sys-color-surface); /* slate-50 approx */
	font-size: var(--sys-font-size-xs);
	font-weight: 500;
	border-radius: var(--sys-radius-sm);
	border: none;
	box-shadow:
		0 4px 6px -1px rgb(0 0 0 / 0.1),
		0 2px 4px -2px rgb(0 0 0 / 0.1);
	z-index: 50;
	white-space: nowrap;

	/* Reset positioning to be controlled by JS */
	inset: auto;
	position: fixed;

	/* Baseline hidden state */
	display: none;

	/* Native API state and our fallback state */
	&:popover-open,
	&.fallback-open {
		display: block;
		animation: popoverFadeIn 0.15s ease-out forwards;
	}

	@keyframes popoverFadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;
