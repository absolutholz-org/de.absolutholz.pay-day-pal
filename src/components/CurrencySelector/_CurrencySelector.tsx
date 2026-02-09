import { SUPPORTED_CURRENCIES } from "../../constants";
import { RadioCardGroup } from "../RadioCardGroup";

export interface CurrencySelectorProps {
	value: string;
	onChange: (value: string) => void;
}

export const CurrencySelector = ({
	onChange,
	value,
}: CurrencySelectorProps) => {
	return (
		<RadioCardGroup
			options={SUPPORTED_CURRENCIES.map(({ emoji, label, value }) => ({
				icon: emoji,
				label,
				value,
			}))}
			name="currency"
			initialValue={value}
			onChange={onChange}
		/>
	);
};
