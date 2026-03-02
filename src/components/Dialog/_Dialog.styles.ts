/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// Animation for the modal appearing
export const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const slideUp = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

export const DialogBase = styled.dialog`
	background: transparent;
	border: none;
	border-radius: 1rem;
	margin: auto;
	max-width: 40rem;
	overflow: visible;
	padding: 0;
	width: calc(100% - 2rem);

	&::backdrop {
		animation: ${fadeIn} 0.3s ease-out;
		backdrop-filter: blur(2px);
		background-color: var(--dialog-overlay);
	}

	&[open] {
		animation: ${slideUp} 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	&:focus-visible {
		outline: none;
	}
`;

export const DialogContainer = styled.div`
	background-color: var(--dialog-bg);
	border: 1px solid var(--card-border);
	border-radius: 1rem;
	box-shadow:
		0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05),
		0 0 0 1px var(--card-border);
	color: var(--text-main);
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

export const DialogHeader = styled.div`
	align-items: center;
	background-color: var(--dialog-header-bg);
	border-bottom: 1px solid var(--card-border);
	display: flex;
	justify-content: space-between;
	padding: var(--sys-spacing-md) var(--sys-spacing-lg);
`;

export const DialogTitle = styled.h2`
	background: var(--title-gradient);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	font-size: var(--sys-font-size-2xl);
	font-weight: 700;
	margin: 0;
	-webkit-text-fill-color: transparent;
`;

export const CloseButton = styled.button`
	align-items: center;
	background: transparent;
	border: none;
	border-radius: 9999px;
	color: var(--text-sub);
	cursor: pointer;
	display: flex;
	justify-content: center;
	padding: var(--sys-spacing-sm);
	transition: all 0.2s;

	&:hover {
		background-color: var(--close-btn-hover);
		color: var(--text-main);
	}

	&:focus-visible {
		box-shadow: 0 0 0 2px var(--accent);
		outline: none;
	}
`;

export const DialogContent = styled.div`
	color: var(--text-sub);
	font-size: 0.9375rem;
	line-height: 1.5;
	padding: var(--sys-spacing-lg);
`;

export const DialogFooter = styled.div`
	display: flex;
	gap: var(--sys-spacing-sm);
	justify-content: flex-end;
	padding: 0 var(--sys-spacing-lg) var(--sys-spacing-lg) var(--sys-spacing-lg);
`;
