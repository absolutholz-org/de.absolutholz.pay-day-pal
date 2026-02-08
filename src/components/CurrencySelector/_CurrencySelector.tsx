import { SUPPORTED_CURRENCIES } from "../../constants";
import { RadioCardGroup } from "../RadioCardGroup";

export interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CurrencySelector = ({
  value,
  onChange,
}: CurrencySelectorProps) => {
  return (
    <RadioCardGroup
      options={SUPPORTED_CURRENCIES.map(({ value, label, emoji }) => ({
        value,
        label,
        icon: emoji,
      }))}
      name="currency"
      initialValue={value}
      onChange={onChange}
    />
  );
};
