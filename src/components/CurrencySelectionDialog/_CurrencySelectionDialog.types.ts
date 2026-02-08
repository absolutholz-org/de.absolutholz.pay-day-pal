import type { Currency } from "../../types";

export interface CurrencySelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (currency: Currency) => void;
  currentCurrency: Currency;
}
