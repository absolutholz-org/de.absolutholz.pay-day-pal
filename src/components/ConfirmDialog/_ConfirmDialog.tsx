import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { ConfirmDialogProps } from "./_ConfirmDialog.types";

export function ConfirmDialog({
	isOpen,
	title,
	message,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	onConfirm,
	onCancel,
	variant = "primary",
	children,
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
