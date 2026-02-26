import styled from "@emotion/styled";

export const Tooltip = styled.div`
	margin: 0;
	padding: 0.375rem 0.75rem;
	background-color: oklch(0.28 0.03 260); /* slate-800 approx */
	color: oklch(0.98 0.01 260); /* slate-50 approx */
	font-size: 0.75rem;
	font-weight: 500;
	border-radius: 0.375rem;
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
