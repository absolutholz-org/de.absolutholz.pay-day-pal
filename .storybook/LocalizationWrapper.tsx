import { type ReactNode, useEffect } from "react";

import { useLocalization } from "../src/context/LocalizationContext";
import { type Language } from "../src/types";

export function LocalizationWrapper({
	children,
	language,
}: {
	children: ReactNode;
	language: Language;
}) {
	const { setLanguage } = useLocalization();

	useEffect(() => {
		setLanguage(language);
	}, [language, setLanguage]);

	return <>{children}</>;
}
