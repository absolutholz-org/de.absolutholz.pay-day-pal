import { useMemo } from "react";

import { useData } from "../context/DataContext";
import { type HouseholdMember } from "../types";

export function useMember(
	memberId?: string | null,
): HouseholdMember | undefined {
	const { currentHousehold } = useData();

	return useMemo(() => {
		if (!currentHousehold || !memberId) return undefined;
		return currentHousehold.members.find((m) => m.id === memberId);
	}, [currentHousehold, memberId]);
}
