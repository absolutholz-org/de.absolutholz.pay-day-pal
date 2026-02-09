import { useMemo } from "react";

export function useCurrency(
	amount: number,
	locale = "en-DE",
	currency = "EUR",
) {
	return useMemo(() => {
		return new Intl.NumberFormat(locale, {
			currency: currency,
			style: "currency",
		}).format(amount);
	}, [amount, locale, currency]);
}
