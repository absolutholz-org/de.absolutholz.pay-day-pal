import { useState, useEffect } from "react";

import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Input } from "../Input";
import { PromptDialogProps } from "./_PromptDialog.types";

export function PromptDialog({
  isOpen,
  title,
  message,
  defaultValue = "",
  onConfirm,
  onCancel,
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  inputPlaceholder,
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
      title={title || ""}
      footer={
        <>
          <Button variant="text" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={() => onConfirm(value)}>{confirmLabel}</Button>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>{message}</div>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={inputPlaceholder}
          autoFocus
        />
      </div>
    </Dialog>
  );
}
