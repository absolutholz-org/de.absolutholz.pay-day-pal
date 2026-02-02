import { Pencil } from "lucide-react";

import { DataDisplayProps } from "./_DataDisplay.types";
import * as S from "./_DataDisplay.styles";
import { Button } from "../Button";

export function DataDisplay({
  label,
  data,
  onEdit,
  editLabel,
}: DataDisplayProps & { editLabel?: string }) {
  return (
    <S.DataDisplay>
      <S.DataDisplay_Label>{label}:</S.DataDisplay_Label>
      <S.DataDisplay_Data>
        {data}
        {onEdit && (
          <Button
            variant="text"
            color="secondary"
            onClick={onEdit}
            title={editLabel}
            aria-label={editLabel}
            startIcon={<Pencil size={14} aria-hidden="true" />}
            size="small"
          />
        )}
      </S.DataDisplay_Data>
    </S.DataDisplay>
  );
}
