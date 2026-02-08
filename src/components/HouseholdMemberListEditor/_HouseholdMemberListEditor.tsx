import { AccentColor, HouseholdMember } from "../../types";
import { HouseholdMemberEditorRow } from "../HouseholdMemberEditorRow";
import * as S from "./_HouseholdMemberListEditor.styles";

export interface HouseholdMemberListEditorProps {
  members: HouseholdMember[];
  onAddMember: (name: string, emoji: string, color: AccentColor) => void;
  onUpdateMember: (id: string, data: Partial<HouseholdMember>) => void;
  onToggleMemberStatus: (id: string) => void;
  labels?: {
    newMemberNamePlaceholder?: string;
    disableConfirm?: string;
    addMember?: string;
  };
}

export function HouseholdMemberListEditor({
  members,
  // onAddMember,
  // onUpdateMember,
  // onToggleMemberStatus,
  // labels = {},
}: HouseholdMemberListEditorProps) {
  // const [newMemberName, setNewMemberName] = useState("");
  // const [newMemberEmoji, setNewMemberEmoji] = useState("👤");
  // const [newMemberColor, setNewMemberColor] = useState<AccentColor>("blue");
  // const [isAdding, setIsAdding] = useState(false);

  // const handleAdd = () => {
  //   if (!newMemberName.trim()) return;
  //   onAddMember(newMemberName, newMemberEmoji, newMemberColor);
  //   setNewMemberName("");
  //   setNewMemberEmoji("👤");
  //   setNewMemberColor("blue");
  //   setIsAdding(false);
  // };

  // const colorOptions = ACCENT_COLORS.map((c) => ({ value: c, label: c }));

  return (
    <div>
      <S.HouseholdMemberListEditor_List>
        {members.map((member) => (
          <HouseholdMemberEditorRow
            key={member.id}
            member={member}
            // onUpdate={onUpdateMember}
            // onToggleStatus={onToggleMemberStatus}
            // disableConfirmLabel={labels.disableConfirm}
          />
        ))}
      </S.HouseholdMemberListEditor_List>

      {/* {isAdding ? (
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <div style={{ width: "60px" }}>
            <Input
              value={newMemberEmoji}
              onChange={(e) => setNewMemberEmoji(e.target.value)}
              style={{ textAlign: "center", marginBottom: 0 }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input
              placeholder={labels.newMemberNamePlaceholder || "New Member Name"}
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ width: "120px" }}>
            <Select
              value={newMemberColor}
              onChange={(e) => setNewMemberColor(e.target.value as AccentColor)}
              options={colorOptions}
              style={{ marginBottom: 0 }}
            />
          </div>
          <Button
            onClick={handleAdd}
            startIcon={<Plus size={20} aria-hidden="true" />}
          ></Button>
        </div>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Plus size={20} aria-hidden="true" />}
          onClick={() => setIsAdding(true)}
        >
          {labels.addMember || "Add Member"}
        </Button>
      )} */}
    </div>
  );
}
