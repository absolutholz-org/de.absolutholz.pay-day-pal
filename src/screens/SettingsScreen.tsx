import { ArrowLeft, Euro, History } from "lucide-react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { HouseholdMemberListEditor } from "../components/HouseholdMemberListEditor";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../context/DataContext";
import { useLocalization } from "../context/LocalizationContext";
import { SUPPORTED_CURRENCIES, SUPPORTED_LANGUAGES } from "../constants";
import type { Currency, Language } from "../types";
import { Button } from "../components/Button";
import { PageSection } from "../components/PageSection";
import { DataDisplay } from "../components/DataDisplay";
import { PromptDialog } from "../components/PromptDialog";
import { LanguageSelector } from "../components/LanguageSelector";
import { FrostedGlassSection } from "../components/FrostedGlassSection";

export default function SettingsScreen({}) {
  const {
    currentHousehold: household,
    updateHouseholdName,
    updateHouseholdLanguage,
    updateHouseholdCurrency,
    addMember,
    updateMember,
    toggleMemberStatus,
    leaveHousehold,
    finishPeriod,
  } = useData();
  const { t } = useLocalization();

  const version = import.meta.env.PACKAGE_VERSION;

  if (!household) return null;

  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [isPaydayDialogOpen, setIsPaydayDialogOpen] = useState(false);
  const [isEditNameDialogOpen, setIsEditNameDialogOpen] = useState(false);
  const [isEditLanguageDialogOpen, setIsEditLanguageDialogOpen] =
    useState(false);
  const [isEditCurrencyDialogOpen, setIsEditCurrencyDialogOpen] =
    useState(false);
  const [startNewPeriod, setStartNewPeriod] = useState(true);

  const householdLanguage = SUPPORTED_LANGUAGES.find(
    (l) => l.value === household.language,
  );
  const householdCurrency = SUPPORTED_CURRENCIES.find(
    (c) => c.value === household.currency,
  );

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
          <FrostedGlassSection headline={t.appearance}>
            <ColorSchemeToggle />
          </FrostedGlassSection>

          <FrostedGlassSection headline={t.appLanguage}>
            <LanguageSelector />
          </FrostedGlassSection>
        </PageSection>

        <PageSection headline={t.household}>
          <FrostedGlassSection headline="Properties">
            <DataDisplay
              label={t.householdName}
              onEdit={() => {
                setIsEditNameDialogOpen(true);
              }}
              editLabel={t.editHouseholdName}
            >
              {household.name}
            </DataDisplay>

            <DataDisplay
              label={t.householdLanguage}
              icon={householdLanguage?.emoji}
              onEdit={() => setIsEditLanguageDialogOpen(true)}
              editLabel={t.editHouseholdLanguage}
            >
              {householdLanguage?.label || household.language}
            </DataDisplay>

            <DataDisplay
              label={t.householdCurrency}
              icon={householdCurrency?.emoji}
              onEdit={() => setIsEditCurrencyDialogOpen(true)}
              editLabel={t.editHouseholdCurrency}
            >
              {householdCurrency?.label || household.currency}
            </DataDisplay>
          </FrostedGlassSection>

          <FrostedGlassSection headline={t.members}>
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
          </FrostedGlassSection>
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

        <PageSection headline={t.about}>
          <FrostedGlassSection>
            <DataDisplay label={t.appVersion}>{version}</DataDisplay>
          </FrostedGlassSection>
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

        <PromptDialog
          isOpen={isEditCurrencyDialogOpen}
          title={t.editHouseholdCurrency}
          message={t.householdCurrency}
          defaultValue={household.currency}
          options={SUPPORTED_CURRENCIES}
          onConfirm={(value) => {
            updateHouseholdCurrency(value as Currency);
            setIsEditCurrencyDialogOpen(false);
          }}
          onCancel={() => setIsEditCurrencyDialogOpen(false)}
          confirmLabel={t.confirm}
          cancelLabel={t.cancel}
        />
      </PageContainer>
    </>
  );
}
