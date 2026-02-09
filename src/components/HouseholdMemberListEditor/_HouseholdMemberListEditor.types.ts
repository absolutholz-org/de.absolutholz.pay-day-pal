import { type AccentColor, type HouseholdMember } from "../../types";

export interface HouseholdMemberListEditorProps {
	members: HouseholdMember[];
	onAddMember: (name: string, emoji: string, color: AccentColor) => void;
	onUpdateMember: (id: string, data: Partial<HouseholdMember>) => void;
	onToggleMemberStatus: (id: string) => void;
	labels?: {
		newMemberNamePlaceholder?: string;
		disableConfirm?: string;
	};
}
