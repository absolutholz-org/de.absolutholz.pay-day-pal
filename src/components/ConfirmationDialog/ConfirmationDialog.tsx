import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalActions,
  ModalButton,
} from '../../styles';
import { ConfirmationDialogProps } from './ConfirmationDialog.types';

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'primary',
  children,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <ModalText>{message}</ModalText>
        {children}
        <ModalActions>
          <ModalButton variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </ModalButton>
          <ModalButton variant={variant} onClick={onConfirm}>
            {confirmLabel}
          </ModalButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
}
