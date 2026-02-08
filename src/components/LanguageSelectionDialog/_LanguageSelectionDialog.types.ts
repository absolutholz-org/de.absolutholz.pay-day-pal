import type { Language } from "../../types";

export interface LanguageSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (language: Language) => void;
  currentLanguage: Language;
}
