import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";

import { IconButton, ResetButton } from "../../globalStyles";
import { ACCENT_COLORS, AccentColor } from "../../types";
import { Input } from "../Input";
import { Select } from "../Select";
import { HouseholdMemberListEditorProps } from "./_HouseholdMemberListEditor.types";

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

  const handleAdd = () => {
    if (!newMemberName.trim()) return;
    onAddMember(newMemberName, newMemberEmoji, newMemberColor);
    setNewMemberName("");
    setNewMemberEmoji("👤");
    setNewMemberColor("blue");
  };

  const colorOptions = ACCENT_COLORS.map((c) => ({ value: c, label: c }));

  return (
    <div>
      {members.map((member) => (
        <div
          key={member.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            opacity: member.disabled ? 0.6 : 1,
          }}
        >
          <div style={{ width: "60px" }}>
            <Input
              value={member.emoji}
              onChange={(e) =>
                onUpdateMember(member.id, { emoji: e.target.value })
              }
              style={{ textAlign: "center", marginBottom: 0 }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input value={member.name} readOnly style={{ marginBottom: 0 }} />
          </div>
          <div style={{ width: "120px" }}>
            <Select
              value={member.color}
              onChange={(e) =>
                onUpdateMember(member.id, {
                  color: e.target.value as AccentColor,
                })
              }
              options={colorOptions}
              style={{ marginBottom: 0 }}
            />
          </div>
          <IconButton
            style={{
              position: "static",
              color: member.disabled ? "#2ecc71" : "#e74c3c",
            }}
            onClick={() => {
              if (
                member.disabled ||
                !labels.disableConfirm ||
                window.confirm(
                  labels.disableConfirm.replace("{name}", member.name),
                )
              ) {
                onToggleMemberStatus(member.id);
              }
            }}
          >
            {member.disabled ? <RotateCcw size={20} /> : <Trash2 size={20} />}
          </IconButton>
        </div>
      ))}
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
    </div>
  );
}
