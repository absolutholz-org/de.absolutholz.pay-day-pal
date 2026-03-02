import styled from "@emotion/styled";

export const LoadingIndicator = styled.div`
	position: absolute;
	top: var(--sys-spacing-sm);
	right: var(--sys-spacing-2xl); /* Left of the settings/menu icon */
	color: var(--sys-color-primary);
	animation: spin 1s linear infinite;
	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
	display: flex;
`;
