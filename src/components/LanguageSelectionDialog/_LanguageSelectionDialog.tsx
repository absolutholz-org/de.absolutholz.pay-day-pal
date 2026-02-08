import { useState } from "react";

import { SUPPORTED_CURRENCIES, SUPPORTED_LANGUAGES } from "../../constants";
import { useLocalization } from "../../context/LocalizationContext";
import { Language } from "../../types";
import { Dialog } from "../Dialog";
import { RadioCardGroup } from "../RadioCardGroup";
import { Button } from "../Button";
import type { LanguageSelectionDialogProps } from "./_LanguageSelectionDialog.types";

export function LanguageSelectionDialog({
  isOpen,
  onClose,
  onConfirm,
  currentLanguage,
}: LanguageSelectionDialogProps) {
  const { t } = useLocalization();
  const [language, setLanguage] = useState<Language>(currentLanguage);

  return (
    <Dialog
      isOpen={isOpen}
      title={t.editHouseholdLanguage}
      onClose={onClose}
      footer={
        <>
          <Button variant="text" onClick={onClose}>
            {t.cancel}
          </Button>
          <Button onClick={() => onConfirm(language)}>{t.confirm}</Button>
        </>
      }
    >
      <RadioCardGroup
        options={SUPPORTED_LANGUAGES.map(({ value, label, emoji }) => ({
          value,
          label,
          icon: emoji,
        }))}
        name="language"
        initialValue={currentLanguage}
        onChange={(value) => setLanguage(value as Language)}
      />
    </Dialog>
  );
}
