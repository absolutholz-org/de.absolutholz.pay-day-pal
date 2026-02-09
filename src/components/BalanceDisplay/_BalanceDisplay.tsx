import { useLocalization } from "../../context/LocalizationContext";
import { useCurrency } from "../../hooks/useCurrency";

import * as S from "./_BalanceDisplay.styles";
import { BalanceDisplayProps } from "./_BalanceDisplay.types";

export function BalanceDisplay({ total }: BalanceDisplayProps) {
	const { t } = useLocalization();
	const formattedValue = useCurrency(total, "en-DE", "EUR");

	return (
		<S.BalanceDisplay>
			<S.BalanceDisplay_Label>{t.currentEarnings}</S.BalanceDisplay_Label>
			<S.BalanceDisplay_Value>{formattedValue}</S.BalanceDisplay_Value>
		</S.BalanceDisplay>
	);
}
