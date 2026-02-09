import { useState } from "react";

import { SUPPORTED_CURRENCIES } from "../../constants";
import { useLocalization } from "../../context/LocalizationContext";
import { Currency } from "../../types";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { RadioCardGroup } from "../RadioCardGroup";
import type { CurrencySelectionDialogProps } from "./_CurrencySelectionDialog.types";

export function CurrencySelectionDialog({
	isOpen,
	onClose,
	onConfirm,
	currentCurrency,
}: CurrencySelectionDialogProps) {
	const { t } = useLocalization();
	const [currency, setCurrency] = useState<Currency>(currentCurrency);

	return (
		<Dialog
			isOpen={isOpen}
			title={t.editHouseholdCurrency}
			onClose={onClose}
			footer={
				<>
					<Button variant="text" onClick={onClose}>
						{t.cancel}
					</Button>
					<Button onClick={() => onConfirm(currency)}>
						{t.confirm}
					</Button>
				</>
			}
		>
			<RadioCardGroup
				options={SUPPORTED_CURRENCIES.map(
					({ value, label, emoji }) => ({
						value,
						label,
						icon: emoji,
					}),
				)}
				name="currency"
				initialValue={currentCurrency}
				onChange={(value) => setCurrency(value as Currency)}
			/>
		</Dialog>
	);
}
