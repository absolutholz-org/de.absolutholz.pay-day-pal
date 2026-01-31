import { Plus } from "lucide-react";
import { useState } from "react";

import { ResetButton } from "../../globalStyles";
import { ACCENT_COLORS, AccentColor, HouseholdMember } from "../../types";
import { HouseholdMemberEditorRow } from "../HouseholdMemberEditorRow";
import { Input } from "../Input";
import { Select } from "../Select";

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
  onAddMember,
  onUpdateMember,
  onToggleMemberStatus,
  labels = {},
}: HouseholdMemberListEditorProps) {
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmoji, setNewMemberEmoji] = useState("👤");
  const [newMemberColor, setNewMemberColor] = useState<AccentColor>("blue");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!newMemberName.trim()) return;
    onAddMember(newMemberName, newMemberEmoji, newMemberColor);
    setNewMemberName("");
    setNewMemberEmoji("👤");
    setNewMemberColor("blue");
    setIsAdding(false);
  };

  const colorOptions = ACCENT_COLORS.map((c) => ({ value: c, label: c }));

  return (
    <div>
      {members.map((member) => (
        <HouseholdMemberEditorRow
          key={member.id}
          member={member}
          onUpdate={onUpdateMember}
          onToggleStatus={onToggleMemberStatus}
          disableConfirmLabel={labels.disableConfirm}
        />
      ))}
      {isAdding ? (
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
          <ResetButton
            style={{
              margin: 0,
              padding: "0.5rem 1rem",
              background: "#3498db",
            }}
            onClick={handleAdd}
          >
            <Plus size={20} />
          </ResetButton>
        </div>
      ) : (
        <ResetButton
          style={{
            marginTop: "0.5rem",
            width: "100%",
            justifyContent: "center",
          }}
          onClick={() => setIsAdding(true)}
        >
          <Plus size={20} style={{ marginRight: "0.5rem" }} />
          {labels.addMember || "Add Member"}
        </ResetButton>
      )}
    </div>
  );
}
