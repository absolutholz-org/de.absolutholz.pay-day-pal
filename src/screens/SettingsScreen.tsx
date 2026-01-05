import { doc, Firestore, updateDoc } from "firebase/firestore";
import { ArrowLeft, History, Plus, RotateCcw, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { FormGroup, IconButton, Input, Label, ResetButton } from "../styles";
import {
  CloseButton,
  SettingsContainer,
  SettingsHeader,
  SettingsPage,
  SettingsTitle,
} from "../styles";
import { Household, Member, Period } from "../types";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle";

export default function SettingsScreen({
  isOpen,
  onClose,
  household,
  activePeriod,
  onLeaveHousehold,
  onFinishPeriod,
  onStartPeriod,
  onViewHistory,
  db,
}: {
  isOpen: boolean;
  onClose: () => void;
  household: Household;
  activePeriod: Period | null;
  onLeaveHousehold: () => void;
  onFinishPeriod: (shouldStartNew: boolean) => void;
  onStartPeriod: () => void;
  onViewHistory: () => void;
  db: Firestore;
}) {
  const [settingsName, setSettingsName] = useState(household.name);
  const [newMemberName, setNewMemberName] = useState("");
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [showFinishPeriodConfirm, setShowFinishPeriodConfirm] = useState(false);
  const [shouldStartNew, setShouldStartNew] = useState(true);

  useEffect(() => {
    setSettingsName(household.name);
  }, [household.name]);

  if (!isOpen) return null;

  return (
    <SettingsPage>
      <SettingsContainer>
        <SettingsHeader>
          <SettingsTitle>Settings</SettingsTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </SettingsHeader>
        <FormGroup>
          <Label>Appearance</Label>
          <ColorSchemeToggle />
        </FormGroup>
        <h2>Household</h2>
        <FormGroup>
          <Label>Name</Label>
          <Input
            value={settingsName}
            onChange={(e) => setSettingsName(e.target.value)}
            onBlur={async () => {
              if (settingsName.trim() !== household.name) {
                await updateDoc(doc(db, "households", household.id), {
                  name: settingsName.trim(),
                });
              }
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Members</Label>
          {household.members.map((member) => (
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
              <Input
                value={member.name}
                readOnly
                style={{
                  marginBottom: 0,
                  backgroundColor: "#f8f9fa",
                  textDecoration: member.disabled ? "line-through" : "none",
                }}
              />
              <IconButton
                style={{
                  position: "static",
                  color: member.disabled ? "#2ecc71" : "#e74c3c",
                }}
                onClick={async () => {
                  if (
                    member.disabled ||
                    window.confirm(`Disable ${member.name}?`)
                  ) {
                    const newMembers = household.members.map((m) =>
                      m.id === member.id ? { ...m, disabled: !m.disabled } : m
                    );
                    await updateDoc(doc(db, "households", household.id), {
                      members: newMembers,
                    });
                    // Active child switch is handled in App.tsx via useEffect
                  }
                }}
              >
                {member.disabled ? (
                  <RotateCcw size={20} />
                ) : (
                  <Trash2 size={20} />
                )}
              </IconButton>
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <Input
              placeholder="New Member Name"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              style={{ marginBottom: 0 }}
            />
            <ResetButton
              style={{
                margin: 0,
                padding: "0.5rem 1rem",
                background: "#3498db",
              }}
              onClick={async () => {
                if (newMemberName.trim()) {
                  const newId = newMemberName
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const newMember: Member = {
                    id: newId,
                    name: newMemberName.trim(),
                  };
                  const newMembers = [...household.members, newMember];
                  await updateDoc(doc(db, "households", household.id), {
                    members: newMembers,
                  });
                  setNewMemberName("");
                }
              }}
            >
              <Plus size={20} />
            </ResetButton>
          </div>
        </FormGroup>
        <FormGroup>
          <Label as="h2">Period Management</Label>
          {activePeriod ? (
            <ResetButton
              onClick={() => setShowFinishPeriodConfirm(true)}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <RotateCcw size={18} />
              Finish Period
            </ResetButton>
          ) : (
            <ResetButton
              onClick={onStartPeriod}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <RotateCcw size={18} />
              Start Period
            </ResetButton>
          )}
          <ResetButton
            onClick={onViewHistory}
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: "0.5rem",
              background: "#34495e",
            }}
          >
            <History size={18} />
            View History
          </ResetButton>
        </FormGroup>
        <ResetButton
          onClick={() => {
            setShowLeaveConfirm(true);
          }}
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: "1rem",
            backgroundColor: "#95a5a6",
          }}
        >
          <ArrowLeft size={18} />
          Leave Household
        </ResetButton>

        <ConfirmationDialog
          isOpen={showLeaveConfirm}
          title="Leave Household?"
          message="Are you sure you want to leave this household? You will need to select it again from the main menu to return."
          confirmLabel="Leave"
          variant="danger"
          onConfirm={() => {
            window.history.pushState(null, "", "/");
            onLeaveHousehold();
          }}
          onCancel={() => setShowLeaveConfirm(false)}
        />

        <ConfirmationDialog
          isOpen={showFinishPeriodConfirm}
          title="Finish Current Period?"
          message="This will save the current period to history."
          confirmLabel="Confirm"
          onConfirm={() => {
            onFinishPeriod(shouldStartNew);
            setShowFinishPeriodConfirm(false);
          }}
          onCancel={() => setShowFinishPeriodConfirm(false)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <input
              type="checkbox"
              id="shouldStartNew"
              checked={shouldStartNew}
              onChange={(e) => setShouldStartNew(e.target.checked)}
              style={{ width: "1.2rem", height: "1.2rem" }}
            />
            <label htmlFor="shouldStartNew" style={{ color: "#2c3e50" }}>
              Start a new period
            </label>
          </div>
        </ConfirmationDialog>
      </SettingsContainer>
    </SettingsPage>
  );
}
