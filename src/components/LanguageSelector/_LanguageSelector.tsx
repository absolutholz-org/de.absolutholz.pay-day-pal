import { Language } from "../../types";
import { SUPPORTED_LANGUAGES } from "../../constants";
import { RadioCardGroup } from "../RadioCardGroup";
import { useLocalization } from "../../context/LocalizationContext";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLocalization();

  return (
    <RadioCardGroup
      options={SUPPORTED_LANGUAGES.map(({ value, label, emoji }) => ({
        value,
        label,
        icon: emoji,
      }))}
      name="appLanguage"
      initialValue={language}
      onChange={(value) => setLanguage(value as Language)}
    />
  );
};
