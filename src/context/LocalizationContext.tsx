import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { TRANSLATIONS, TranslationKey } from "../constants/translations";
import type { Language } from "../types";
import { useData } from "./DataContext";

interface LocalizationContextType {
  t: Record<TranslationKey, string>;
  language: Language;
  setLanguage: (language: Language) => void;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined,
);

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const { currentHousehold } = useData();

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("payDayPal_language");
    if (saved) {
      return saved as Language;
    }
    return "en";
  });

  useEffect(() => {
    const saved = localStorage.getItem("payDayPal_language");
    if (!saved && currentHousehold?.language) {
      setLanguageState(currentHousehold.language);
    }
  }, [currentHousehold?.language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("payDayPal_language", newLanguage);
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

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider",
    );
  }
  return context;
}
