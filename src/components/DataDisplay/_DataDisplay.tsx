import { Pencil } from "lucide-react";

import { DataDisplayProps } from "./_DataDisplay.types";
import * as S from "./_DataDisplay.styles";
import { Button } from "../Button";

export function DataDisplay({
  label,
  icon,
  children,
  onEdit,
  editLabel,
}: DataDisplayProps & { editLabel?: string }) {
  return (
    <S.DataDisplay>
      <S.DataDisplay_Label>{label}:</S.DataDisplay_Label>
      {icon && <S.DataDisplay_Icon>{icon}</S.DataDisplay_Icon>}
      <S.DataDisplay_Data>{children}</S.DataDisplay_Data>
      {onEdit && (
        <span>
          <Button
            variant="text"
            onClick={onEdit}
            title={editLabel}
            aria-label={editLabel}
            startIcon={<Pencil size={16} aria-hidden="true" />}
            size="small"
          />
        </span>
      )}
    </S.DataDisplay>
  );
}
