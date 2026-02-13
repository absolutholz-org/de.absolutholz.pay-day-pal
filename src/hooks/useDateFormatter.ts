import { useMemo } from "react";

import { useLocalization } from "../context/LocalizationContext";

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
	day: "numeric", // '12'
	month: "long", // 'February' vs 'Feb'
	weekday: "long", // 'Monday' vs 'Mon'
};

export function useDateFormatter(
	options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS,
) {
	const { language } = useLocalization();

	return useMemo(
		() => new Intl.DateTimeFormat(language, options),
		[language, options],
	);
}
