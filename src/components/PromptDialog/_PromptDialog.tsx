import { useEffect, useState } from "react";

import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Input } from "../Input";
import { Select } from "../Select";
import { VisuallyHidden } from "../VisuallyHidden";
import { type PromptDialogProps } from "./_PromptDialog.types";

export function PromptDialog({
	cancelLabel = "Cancel",
	confirmLabel = "OK",
	defaultValue = "",
	inputPlaceholder,
	isOpen,
	message,
	onCancel,
	onConfirm,
	options,
	title,
}: PromptDialogProps) {
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		if (isOpen) {
			setValue(defaultValue);
		}
	}, [isOpen, defaultValue]);

	return (
		<Dialog
			isOpen={isOpen}
			onClose={onCancel}
			title={title}
			footer={
				<>
					<Button variant="text" onClick={onCancel}>
						{cancelLabel}
					</Button>
					<Button onClick={() => onConfirm(value)}>
						{confirmLabel}
					</Button>
				</>
			}
		>
			<label
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--sys-spacing-md)",
				}}
			>
				<VisuallyHidden>{message}</VisuallyHidden>
				{options ? (
					<Select
						value={value}
						onChange={(e) => setValue(e.target.value)}
						options={options}
						autoFocus
					/>
				) : (
					<Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder={inputPlaceholder}
						autoFocus
					/>
				)}
			</label>
		</Dialog>
	);
}
