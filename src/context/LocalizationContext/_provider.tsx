import { type ReactNode, useEffect, useMemo, useState } from "react";

import { LOCAL_STORAGE_KEY_PREFIX } from "../../constants";
import type { Language } from "../../types";
import { useData } from "../DataContext/_hooks";
import { TRANSLATIONS } from "../../constants/translations";
import { LocalizationContext } from "./_context";

const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_KEY_PREFIX}language`;

export function LocalizationProvider({ children }: { children: ReactNode }) {
	const { currentHousehold } = useData();

	const [language, setLanguageState] = useState<Language>(() => {
		const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (saved) {
			return saved as Language;
		}
		return "en";
	});

	useEffect(() => {
		const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!saved && currentHousehold?.language) {
			setLanguageState(currentHousehold.language);
		}
	}, [currentHousehold?.language]);

	const setLanguage = (newLanguage: Language) => {
		setLanguageState(newLanguage);
		localStorage.setItem(LOCAL_STORAGE_KEY, newLanguage);
	};

	const value = useMemo(() => {
		const translations = TRANSLATIONS[language];
		return {
			language,
			t: translations,
			setLanguage,
		};
	}, [language]);

	return (
		<LocalizationContext.Provider value={value}>
			{children}
		</LocalizationContext.Provider>
	);
}
