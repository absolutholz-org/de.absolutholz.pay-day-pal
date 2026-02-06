import { Language } from "../../types";
import { SUPPORTED_LANGUAGES } from "../../constants";
import { RadioCardGroup } from "../RadioCardGroup";
import { useLocalization } from "../../context/LocalizationContext";

export const LanguageSelector = () => {
  const { t, language, setLanguage } = useLocalization();

  return (
    <RadioCardGroup
      label={t.appLanguage}
      options={SUPPORTED_LANGUAGES.map(({ value, label, emoji }) => ({
        value,
        label,
        icon: emoji,
      }))}
      name="appLanguage"
      selectedValue={language}
      onChange={(value) => setLanguage(value as Language)}
    />
  );
};
