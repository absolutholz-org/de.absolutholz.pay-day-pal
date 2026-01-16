import { useMemo } from "react";

export function useCurrency(
  amount: number,
  locale = "en-DE",
  currency = "EUR"
) {
  return useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  }, [amount, locale, currency]);
}
