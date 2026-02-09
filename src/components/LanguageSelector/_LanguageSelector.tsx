import { SUPPORTED_LANGUAGES } from "../../constants";
import { useLocalization } from "../../context/LocalizationContext";
import { type Language } from "../../types";
import { RadioCardGroup } from "../RadioCardGroup";

export const LanguageSelector = () => {
	const { language, setLanguage } = useLocalization();

	return (
		<RadioCardGroup
			options={SUPPORTED_LANGUAGES.map(({ emoji, label, value }) => ({
				icon: emoji,
				label,
				value,
			}))}
			name="appLanguage"
			initialValue={language}
			onChange={(value) => setLanguage(value as Language)}
		/>
	);
};
