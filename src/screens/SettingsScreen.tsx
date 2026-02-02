import { ArrowLeft, Euro, History } from "lucide-react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { HouseholdMemberListEditor } from "../components/HouseholdMemberListEditor";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../context/DataContext";
import { useLocalization } from "../context/LocalizationContext";
import { SUPPORTED_LANGUAGES } from "../constants";
import { Select } from "../components/Select";
import { Language } from "../types";
import { FormGroup } from "../globalStyles";
import { Button } from "../components/Button";
import { PageSection } from "../components/PageSection";
import { DataDisplay } from "../components/DataDisplay";
import { PromptDialog } from "../components/PromptDialog";

export default function SettingsScreen({}) {
  const {
    currentHousehold: household,
    updateHouseholdName,
    updateHouseholdLanguage,
    addMember,
    updateMember,
    toggleMemberStatus,
    leaveHousehold,
    finishPeriod,
  } = useData();
  const { t, language, setLanguage } = useLocalization();

  if (!household) return null;

  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [isPaydayDialogOpen, setIsPaydayDialogOpen] = useState(false);
  const [isEditNameDialogOpen, setIsEditNameDialogOpen] = useState(false);
  const [isEditLanguageDialogOpen, setIsEditLanguageDialogOpen] =
    useState(false);
  const [startNewPeriod, setStartNewPeriod] = useState(true);

  return (
    <>
      <PageHeader
        title={t.settings}
        slotLead={
          <Button
            as={Link}
            to="/"
            variant="text"
            label={t.backToHome}
            startIcon={<ArrowLeft size={24} aria-hidden="true" />}
          />
        }
      />
      <PageContainer>
        <PageSection headline={t.system}>
          <FormGroup>
            <Label>{t.appearance}</Label>
            <ColorSchemeToggle />
          </FormGroup>
          <FormGroup>
            <Label>{t.appLanguage}</Label>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              options={SUPPORTED_LANGUAGES}
            />
          </FormGroup>
        </PageSection>

        <PageSection headline={t.household}>
          <DataDisplay
            label={t.householdName}
            data={household.name}
            onEdit={() => {
              setIsEditNameDialogOpen(true);
            }}
            editLabel={t.editHouseholdName}
          />
          <DataDisplay
            label={t.householdLanguage}
            data={
              SUPPORTED_LANGUAGES.find((l) => l.value === household.language)
                ?.label || household.language
            }
            onEdit={() => setIsEditLanguageDialogOpen(true)}
            editLabel={t.editHouseholdLanguage}
          />
          <FormGroup>
            <Label>{t.members}</Label>
            <HouseholdMemberListEditor
              members={household.members}
              onAddMember={addMember}
              onUpdateMember={updateMember}
              onToggleMemberStatus={toggleMemberStatus}
              labels={{
                newMemberNamePlaceholder: t.newMemberName,
                disableConfirm: `${t.disable} {name}?`,
                addMember: t.addMember,
              }}
            />
          </FormGroup>
          <Button
            variant="text"
            color="danger"
            onClick={() => {
              setShowLeaveConfirm(true);
            }}
            startIcon={<ArrowLeft size={20} aria-hidden="true" />}
          >
            {t.leaveHousehold}
          </Button>
        </PageSection>

        <PageSection headline={t.periodManagement}>
          <Button
            as={Link}
            to="/history"
            variant="text"
            startIcon={<History size={20} aria-hidden="true" />}
          >
            {t.viewHistory}
          </Button>

          <Button
            color="secondary"
            onClick={() => setIsPaydayDialogOpen(true)}
            startIcon={<Euro size={20} aria-hidden="true" />}
          >
            {t.endPeriod}
          </Button>
        </PageSection>

        <ConfirmDialog
          isOpen={showLeaveConfirm}
          title={t.leaveHouseholdConfirmTitle}
          message={t.leaveHouseholdConfirmMessage}
          confirmLabel={t.leave}
          cancelLabel={t.cancel}
          variant="danger"
          onConfirm={() => {
            window.history.pushState(null, "", "/");
            leaveHousehold();
          }}
          onCancel={() => setShowLeaveConfirm(false)}
        />

        <ConfirmDialog
          isOpen={isPaydayDialogOpen}
          title={t.paydayTitle}
          message={t.paydayMessage}
          confirmLabel={t.confirm}
          cancelLabel={t.cancel}
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
              {t.startNewPeriod}
            </label>
          </div>
        </ConfirmDialog>

        <PromptDialog
          isOpen={isEditNameDialogOpen}
          title={t.editHouseholdName}
          message={t.householdName}
          defaultValue={household.name}
          onConfirm={(value) => {
            updateHouseholdName(value);
            setIsEditNameDialogOpen(false);
          }}
          onCancel={() => setIsEditNameDialogOpen(false)}
          confirmLabel={t.confirm}
          cancelLabel={t.cancel}
        />

        <PromptDialog
          isOpen={isEditLanguageDialogOpen}
          title={t.editHouseholdLanguage}
          message={t.householdLanguage}
          defaultValue={household.language}
          options={SUPPORTED_LANGUAGES}
          onConfirm={(value) => {
            updateHouseholdLanguage(value as Language);
            setIsEditLanguageDialogOpen(false);
          }}
          onCancel={() => setIsEditLanguageDialogOpen(false)}
          confirmLabel={t.confirm}
          cancelLabel={t.cancel}
        />
      </PageContainer>
    </>
  );
}
