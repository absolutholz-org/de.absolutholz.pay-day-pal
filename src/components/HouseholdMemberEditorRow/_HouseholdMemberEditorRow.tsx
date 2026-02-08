import * as S from "./_HouseholdMemberEditorRow.styles";
import { HouseholdMemberEditorRowProps } from "./_HouseholdMemberEditorRow.types";

export function HouseholdMemberEditorRow({
  member,
  // onUpdate,
  // onToggleStatus,
  // disableConfirmLabel,
}: HouseholdMemberEditorRowProps) {
  // const colorOptions = ACCENT_COLORS.map((c) => ({ value: c, label: c }));

  return (
    <>
      <S.HouseholdMemberEditorRow
        style={{ "--member-color": `var(--accent-${member.color})` }}
      >
        <S.HouseholdMemberEditorRow_Icon>
          {member.emoji}
        </S.HouseholdMemberEditorRow_Icon>
        {member.name}
        <S.HouseholdMemberEditorRow_Actions></S.HouseholdMemberEditorRow_Actions>
      </S.HouseholdMemberEditorRow>

      {/* <S.Row disabled={member.disabled}>
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
        {member.disabled ? (
          <Button
            variant="text"
            size="large"
            onClick={() => {
              if (
                member.disabled ||
                !disableConfirmLabel ||
                window.confirm(
                  disableConfirmLabel.replace("{name}", member.name),
                )
              ) {
                onToggleStatus(member.id);
              }
            }}
          >
            <RotateCcw size={20} />
          </Button>
        ) : (
          <Button
            variant="text"
            size="large"
            color="danger"
            onClick={() => {
              if (
                member.disabled ||
                !disableConfirmLabel ||
                window.confirm(
                  disableConfirmLabel.replace("{name}", member.name),
                )
              ) {
                onToggleStatus(member.id);
              }
            }}
          >
            <Trash2 size={20} />
          </Button>
        )}
      </S.Row> */}
    </>
  );
}
