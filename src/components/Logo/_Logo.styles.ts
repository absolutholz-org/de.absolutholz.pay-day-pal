import styled from "@emotion/styled";

export const Logo = styled.div`
	align-items: center;
	display: flex;
	gap: var(--sys-spacing-md);
	user-select: none;
`;

export const Logo_Icon = styled.div`
	align-items: center;
	background: linear-gradient(135deg, #3498db, #8e44ad);
	border-radius: var(--sys-radius-md);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	color: white;
	display: flex;
	height: 40px;
	justify-content: center;
	width: 40px;
`;

export const Logo_Text = styled.span`
	font-size: var(--sys-font-size-xl);
	font-weight: 800;
	letter-spacing: -0.025em;
`;
