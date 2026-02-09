import { HouseholdMember } from "../../types";

export interface HouseholdMemberSelectorProps {
	members: HouseholdMember[];
	activeMemberId: string;
	onSelectMember: (id: string) => void;
}
