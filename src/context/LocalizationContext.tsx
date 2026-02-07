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
import { LOCAL_STORAGE_KEY_PREFIX } from "../constants";

const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_KEY_PREFIX}language`;

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

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider",
    );
  }
  return context;
}
