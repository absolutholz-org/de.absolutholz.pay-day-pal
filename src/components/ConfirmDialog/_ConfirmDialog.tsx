import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { type ConfirmDialogProps } from "./_ConfirmDialog.types";

export function ConfirmDialog({
	cancelLabel = "Cancel",
	children,
	confirmLabel = "Confirm",
	isOpen,
	message,
	onCancel,
	onConfirm,
	title,
	variant = "primary",
}: ConfirmDialogProps) {
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
					<Button
						color={variant === "danger" ? "danger" : "primary"}
						onClick={onConfirm}
					>
						{confirmLabel}
					</Button>
				</>
			}
		>
			{message && <p>{message}</p>}
			{children}
		</Dialog>
	);
}
