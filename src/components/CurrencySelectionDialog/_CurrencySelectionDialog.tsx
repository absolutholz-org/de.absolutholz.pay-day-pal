import { useState } from "react";

import { SUPPORTED_CURRENCIES } from "../../constants";
import { useLocalization } from "../../context/LocalizationContext";
import { type Currency } from "../../types";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { RadioCardGroup } from "../RadioCardGroup";
import type { CurrencySelectionDialogProps } from "./_CurrencySelectionDialog.types";

export function CurrencySelectionDialog({
	currentCurrency,
	isOpen,
	onClose,
	onConfirm,
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
					({ emoji, label, value }) => ({
						icon: emoji,
						label,
						value,
					}),
				)}
				name="currency"
				initialValue={currentCurrency}
				onChange={(value) => setCurrency(value as Currency)}
			/>
		</Dialog>
	);
}
