import { useMemo } from "react";

import { CHORE_CATEGORIES } from "../constants/constants";
import { useData } from "../context/DataContext";
import { useLocalization } from "../context/LocalizationContext";
import { type AccentColor, type Household } from "../types";

export function useChore(choreId?: string | null):
	| (Omit<Household["chores"][number], "labels"> & {
			color: AccentColor;
			emoji: string;
			label: string;
	  })
	| undefined {
	const { currentHousehold } = useData();
	const { language } = useLocalization();

	return useMemo(() => {
		if (!currentHousehold || !choreId) return undefined;
		const chore = currentHousehold.chores.find((c) => c.id === choreId);
		if (!chore) return undefined;

		const { color, emoji } = CHORE_CATEGORIES[chore.category];
		const { labels, ...rest } = chore;
		return { ...rest, color, emoji, label: labels[language] };
	}, [currentHousehold, choreId, language]);
}
