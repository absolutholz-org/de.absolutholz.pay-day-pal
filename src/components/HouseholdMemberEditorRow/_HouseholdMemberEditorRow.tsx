import { RotateCcw, Trash2 } from "lucide-react";

import { ACCENT_COLORS, AccentColor } from "../../types";
import { Input } from "../Input";
import { Select } from "../Select";
import * as S from "./_HouseholdMemberEditorRow.styles";
import { HouseholdMemberEditorRowProps } from "./_HouseholdMemberEditorRow.types";

export function HouseholdMemberEditorRow({
  member,
  onUpdate,
  onToggleStatus,
  disableConfirmLabel,
}: HouseholdMemberEditorRowProps) {
  const colorOptions = ACCENT_COLORS.map((c) => ({ value: c, label: c }));

  return (
    <S.Row disabled={member.disabled}>
      <S.EmojiContainer>
        <Input
          value={member.emoji}
          onChange={(e) => onUpdate(member.id, { emoji: e.target.value })}
          style={{ textAlign: "center", marginBottom: 0 }}
        />
      </S.EmojiContainer>
      <S.NameContainer>
        <Input value={member.name} readOnly style={{ marginBottom: 0 }} />
      </S.NameContainer>
      <S.ColorContainer>
        <Select
          value={member.color}
          onChange={(e) =>
            onUpdate(member.id, {
              color: e.target.value as AccentColor,
            })
          }
          options={colorOptions}
          style={{ marginBottom: 0 }}
        />
      </S.ColorContainer>
      <S.ActionButton
        disabledMember={member.disabled}
        onClick={() => {
          if (
            member.disabled ||
            !disableConfirmLabel ||
            window.confirm(disableConfirmLabel.replace("{name}", member.name))
          ) {
            onToggleStatus(member.id);
          }
        }}
      >
        {member.disabled ? <RotateCcw size={20} /> : <Trash2 size={20} />}
      </S.ActionButton>
    </S.Row>
  );
}
