import { TranslationKey } from "../../constants/translations";
import { Language } from "../../types";

export interface LocalizationContextType {
	t: Record<TranslationKey, string>;
	language: Language;
	setLanguage: (language: Language) => void;
}
