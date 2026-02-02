import { ReactNode } from "react";

export interface PromptDialogProps {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  defaultValue?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  inputPlaceholder?: string;
  options?: { value: string; label: string }[];
}
