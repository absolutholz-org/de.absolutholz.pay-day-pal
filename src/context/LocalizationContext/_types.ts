import { type TranslationKey } from "../../constants/translations";
import { type Language } from "../../types";

export interface LocalizationContextType {
	t: Record<TranslationKey, string>;
	language: Language;
	setLanguage: (language: Language) => void;
}
