import styled from "@emotion/styled";

export const Row = styled.div<{ disabled?: boolean }>`
	align-items: center;
	display: flex;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

export const EmojiContainer = styled.div`
	width: 60px;
`;

export const NameContainer = styled.div`
	flex: 1;
`;

export const ColorContainer = styled.div`
	width: 120px;
`;

export const HouseholdMemberEditorRow = styled.div`
	align-items: center;
	background-color: var(--card-bg);
	background-image: linear-gradient(
		to right,
		oklch(from var(--member-color) l c h / 0.25),
		transparent 50%
	);
	border: 2px solid var(--card-border);
	border-radius: var(--radius-md);
	color: var(--text-sub);
	display: flex;
	gap: 1rem;
	padding: 0.5rem;
`;

export const HouseholdMemberEditorRow_Icon = styled.div`
	align-items: center;
	background-color: var(--member-color);
	border-radius: var(--radius-md);
	display: flex;
	font-size: 1.5rem;
	height: 3rem;
	justify-content: center;
	width: 3rem;
`;

export const HouseholdMemberEditorRow_Actions = styled.div``;
