import {
  ArrowLeft,
  Euro,
  History,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { PageContainer } from "../components/PageContainer";
import { PageHeadline } from "../components/PageHeadline";
import { useData } from "../context/DataContext";
import {
  FormGroup,
  IconButton,
  Input,
  Label,
  ResetButton,
  SettingsHeader,
} from "../styles";

export default function SettingsScreen({}) {
  const {
    currentHousehold: household,
    updateHouseholdName,
    addMember,
    toggleMemberStatus,
    leaveHousehold,
    finishPeriod,
  } = useData();

  if (!household) return null;

  const [settingsName, setSettingsName] = useState(household.name);
  const [newMemberName, setNewMemberName] = useState("");
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [isPaydayDialogOpen, setIsPaydayDialogOpen] = useState(false);
  const [startNewPeriod, setStartNewPeriod] = useState(true);

  useEffect(() => {
    setSettingsName(household.name);
  }, [household.name]);

  return (
    <PageContainer>
      <SettingsHeader>
        <Link to="/">
          <IconButton>
            <ArrowLeft size={24} />
          </IconButton>
        </Link>
        <PageHeadline>Settings</PageHeadline>
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
          onBlur={() => updateHouseholdName(settingsName)}
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
              onClick={() => {
                if (
                  member.disabled ||
                  window.confirm(`Disable ${member.name}?`)
                ) {
                  toggleMemberStatus(member.id);
                }
              }}
            >
              {member.disabled ? <RotateCcw size={20} /> : <Trash2 size={20} />}
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
              await addMember(newMemberName);
              setNewMemberName("");
            }}
          >
            <Plus size={20} />
          </ResetButton>
        </div>
      </FormGroup>
      <FormGroup>
        <Label as="h2">Period Management</Label>
        <Link
          to="/history"
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: "0.5rem",
            background: "#34495e",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.2s",
            fontFamily: "inherit",
            textDecoration: "none",
          }}
        >
          <History size={18} />
          View History
        </Link>
        <ResetButton
          onClick={() => setIsPaydayDialogOpen(true)}
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: "0.5rem",
            backgroundColor: "#2ecc71",
          }}
        >
          <Euro size={18} /> End Period (Payday)
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
          leaveHousehold();
        }}
        onCancel={() => setShowLeaveConfirm(false)}
      />

      <ConfirmationDialog
        isOpen={isPaydayDialogOpen}
        title="Payday!"
        message="Are you sure you want to end the current pay period?"
        confirmLabel="Confirm"
        onConfirm={async () => {
          await finishPeriod(startNewPeriod);
          setIsPaydayDialogOpen(false);
        }}
        onCancel={() => setIsPaydayDialogOpen(false)}
      >
        <div style={{ marginTop: "1rem" }}>
          <label
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <input
              type="checkbox"
              checked={startNewPeriod}
              onChange={(e) => setStartNewPeriod(e.target.checked)}
            />
            Start a new period immediately
          </label>
        </div>
      </ConfirmationDialog>
    </PageContainer>
  );
}
