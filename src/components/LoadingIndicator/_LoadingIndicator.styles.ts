import styled from "@emotion/styled";

export const LoadingIndicator = styled.div`
	position: absolute;
	top: 0.5rem;
	right: 3rem; /* Left of the settings/menu icon */
	color: oklch(63.7% 0.152 253.7);
	animation: spin 1s linear infinite;
	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
	display: flex;
`;
