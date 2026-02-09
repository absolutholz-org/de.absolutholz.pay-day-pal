import { MouseEvent, useEffect, useRef } from "react";
import { X } from "lucide-react";

import * as S from "./_Dialog.styles";
import type { DialogProps } from "./_Dialog.types";

export const Dialog = ({
	isOpen,
	onClose,
	title,
	children,
	footer,
}: DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			// showModal() activates the backdrop and focus trap
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	// Handle clicking the backdrop to close
	const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) {
			onClose();
		}
	};

	return (
		<S.DialogBase
			ref={dialogRef}
			onCancel={onClose} // Handles the "Escape" key
			onClick={handleBackdropClick}
		>
			<S.DialogContainer onClick={(e) => e.stopPropagation()}>
				<S.DialogHeader>
					<S.DialogTitle>{title}</S.DialogTitle>
					<S.CloseButton onClick={onClose} aria-label="Close modal">
						<X />
					</S.CloseButton>
				</S.DialogHeader>

				<S.DialogContent>{children}</S.DialogContent>

				{footer && <S.DialogFooter>{footer}</S.DialogFooter>}
			</S.DialogContainer>
		</S.DialogBase>
	);
};

// // Export sub-components for flexibility if needed
// Dialog.Footer = Footer;
// Dialog.Button = {
//   Primary: PrimaryButton,
//   Ghost: GhostButton,
//   Destructive: DestructiveButton,
// };
