import { ArrowLeft, Euro, History, Pencil, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/Button";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { CurrencySelectionDialog } from "../components/CurrencySelectionDialog";
import { DataDisplay } from "../components/DataDisplay";
import { Dialog } from "../components/Dialog";
import { FrostedGlassSection } from "../components/FrostedGlassSection";
import { HouseholdMemberListEditor } from "../components/HouseholdMemberListEditor";
import { Input } from "../components/Input";
import { LanguageSelectionDialog } from "../components/LanguageSelectionDialog";
import { LanguageSelector } from "../components/LanguageSelector";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageSection } from "../components/PageSection";
import { PromptDialog } from "../components/PromptDialog";
import { Select } from "../components/Select";
import { SUPPORTED_CURRENCIES, SUPPORTED_LANGUAGES } from "../constants";
import { CHORE_CATEGORIES } from "../constants/constants";
import { useData } from "../context/DataContext";
import { useLocalization } from "../context/LocalizationContext";
import { useChores } from "../hooks/useChores";
import type { Chore, ChoreCategoryId, Language } from "../types";

export default function SettingsScreen() {
	const {
		addMember,
		currentHousehold: household,
		finishPeriod,
		leaveHousehold,
		toggleMemberStatus,
		updateHouseholdCurrency,
		updateHouseholdLanguage,
		updateHouseholdName,
		updateMember,
	} = useData();
	const { language, t } = useLocalization();

	const version = import.meta.env.PACKAGE_VERSION;

	const { addChore, chores, deleteChore, updateChore } = useChores();

	const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
	const [isPaydayDialogOpen, setIsPaydayDialogOpen] = useState(false);
	const [isEditNameDialogOpen, setIsEditNameDialogOpen] = useState(false);
	const [isEditLanguageDialogOpen, setIsEditLanguageDialogOpen] =
		useState(false);
	const [isEditCurrencyDialogOpen, setIsEditCurrencyDialogOpen] =
		useState(false);
	const [startNewPeriod, setStartNewPeriod] = useState(true);

	// Chore state
	const [isChoreDialogOpen, setIsChoreDialogOpen] = useState(false);
	const [editingChore, setEditingChore] = useState<Chore | null>(null);
	const lastFocusedButtonRef = useRef<HTMLButtonElement | null>(null);
	const [isDeleteChoreConfirmOpen, setIsDeleteChoreConfirmOpen] =
		useState(false);
	const [choreToDelete, setChoreToDelete] = useState<Chore | null>(null);

	// Form internal state
	const [choreLabels, setChoreLabels] = useState<Record<Language, string>>(
		SUPPORTED_LANGUAGES.reduce(
			(acc, lang) => ({ ...acc, [lang.value]: "" }),
			{} as Record<Language, string>,
		),
	);
	const [choreValue, setChoreValue] = useState("");
	const [choreCategory, setChoreCategory] =
		useState<ChoreCategoryId>("household");

	const handleOpenChoreDialog = (
		chore?: Chore,
		triggerElement?: HTMLButtonElement | null,
	) => {
		if (triggerElement) {
			lastFocusedButtonRef.current = triggerElement;
		} else if (document.activeElement instanceof HTMLButtonElement) {
			lastFocusedButtonRef.current = document.activeElement;
		}

		if (chore) {
			setEditingChore(chore);
			setChoreLabels(
				SUPPORTED_LANGUAGES.reduce(
					(acc, lang) => ({
						...acc,
						[lang.value]: chore.labels[lang.value] || "",
					}),
					{} as Record<Language, string>,
				),
			);
			setChoreValue(chore.value.toString());
			setChoreCategory(chore.category);
		} else {
			setEditingChore(null);
			setChoreLabels(
				SUPPORTED_LANGUAGES.reduce(
					(acc, lang) => ({ ...acc, [lang.value]: "" }),
					{} as Record<Language, string>,
				),
			);
			setChoreValue("");
			setChoreCategory("household");
		}
		setIsChoreDialogOpen(true);
	};

	const handleCloseChoreDialog = () => {
		setIsChoreDialogOpen(false);
		setEditingChore(null);
		// Return focus for A11Y
		if (lastFocusedButtonRef.current) {
			requestAnimationFrame(() => {
				lastFocusedButtonRef.current?.focus();
				lastFocusedButtonRef.current = null;
			});
		}
	};

	const handleSaveChore = async () => {
		const val = Number.parseFloat(choreValue);

		// Basic validation: Check that all languages have a non-empty name and value is a number
		const allLanguageLabelsFilled = Object.values(choreLabels).every(
			(label) => label.trim() !== "",
		);

		if (!allLanguageLabelsFilled || Number.isNaN(val)) return;

		const labels = Object.fromEntries(
			Object.entries(choreLabels).map(([key, value]) => [
				key,
				value.trim(),
			]),
		) as Record<Language, string>;

		if (editingChore) {
			await updateChore(editingChore.id, {
				category: choreCategory,
				labels,
				value: val,
			});
		} else {
			await addChore({
				category: choreCategory,
				effort: "medium",
				frequency: "daily",
				labels,
				value: val,
			});
		}
		handleCloseChoreDialog();
	};

	if (!household) return null;

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
								addMember: t.addMember,
								disableConfirm: `${t.disable} {name}?`,
								newMemberNamePlaceholder: t.newMemberName,
							}}
						/>
						<Button
							variant="text"
							color="danger"
							onClick={() => {
								setShowLeaveConfirm(true);
							}}
							startIcon={
								<ArrowLeft size={20} aria-hidden="true" />
							}
						>
							{t.leaveHousehold}
						</Button>
					</FrostedGlassSection>

					<FrostedGlassSection headline={t.chores}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "0.5rem",
								paddingBottom: "1rem",
							}}
						>
							{chores.map((chore) => (
								<div
									key={chore.id}
									style={{
										alignItems: "center",
										display: "flex",
										gap: "0.5rem",
										justifyContent: "space-between",
									}}
								>
									<div style={{ flex: 1 }}>
										<DataDisplay
											label={
												chore.labels[language] ||
												chore.labels.en
											}
										>
											{new Intl.NumberFormat(
												household.language,
												{
													currency:
														household.currency,
													style: "currency",
												},
											).format(chore.value)}
										</DataDisplay>
									</div>
									<div
										style={{
											alignItems: "center",
											display: "flex",
											gap: "0.25rem",
										}}
									>
										<button
											type="button"
											onClick={(e) =>
												handleOpenChoreDialog(
													chore,
													e.currentTarget,
												)
											}
											aria-label={`Edit ${
												chore.labels[language] ||
												chore.labels.en
											}`}
											style={{
												alignItems: "center",
												background: "transparent",
												border: "none",
												borderRadius:
													"var(--sys-radius-full)",
												color: "var(--sys-color-primary)",
												cursor: "pointer",
												display: "flex",
												justifyContent: "center",
												minHeight: "48px",
												minWidth: "48px",
												padding: 0,
											}}
										>
											<Pencil
												size={20}
												aria-hidden="true"
											/>
										</button>
										<button
											type="button"
											onClick={(e) => {
												lastFocusedButtonRef.current =
													e.currentTarget;
												setChoreToDelete(chore);
												setIsDeleteChoreConfirmOpen(
													true,
												);
											}}
											aria-label={`Delete ${
												chore.labels[language] ||
												chore.labels.en
											}`}
											style={{
												alignItems: "center",
												background: "transparent",
												border: "none",
												borderRadius:
													"var(--sys-radius-full)",
												color: "var(--sys-color-danger)",
												cursor: "pointer",
												display: "flex",
												justifyContent: "center",
												minHeight: "48px",
												minWidth: "48px",
												padding: 0,
											}}
										>
											<Trash2
												size={20}
												aria-hidden="true"
											/>
										</button>
									</div>
								</div>
							))}
							{chores.length === 0 && (
								<p
									style={{
										color: "var(--sys-color-on-surface-muted)",
										fontStyle: "italic",
										padding: "1rem",
										textAlign: "center",
									}}
								>
									No chores added yet.
								</p>
							)}
						</div>
						<Button
							variant="outlined"
							onClick={(e) =>
								handleOpenChoreDialog(
									undefined,
									e.currentTarget,
								)
							}
							startIcon={<Plus size={20} aria-hidden="true" />}
							style={{ minHeight: "48px", width: "100%" }}
						>
							Add New Chore
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
						<DataDisplay label={t.appVersion}>
							{version}
						</DataDisplay>
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
							style={{
								alignItems: "center",
								display: "flex",
								gap: "0.5rem",
							}}
						>
							<input
								type="checkbox"
								checked={startNewPeriod}
								onChange={(e) =>
									setStartNewPeriod(e.target.checked)
								}
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

				<LanguageSelectionDialog
					isOpen={isEditLanguageDialogOpen}
					onClose={() => setIsEditLanguageDialogOpen(false)}
					onConfirm={(value) => {
						updateHouseholdLanguage(value as Language);
						setIsEditLanguageDialogOpen(false);
					}}
					currentLanguage={household.language}
				/>

				<CurrencySelectionDialog
					isOpen={isEditCurrencyDialogOpen}
					onClose={() => setIsEditCurrencyDialogOpen(false)}
					onConfirm={(value) => {
						updateHouseholdCurrency(value);
						setIsEditCurrencyDialogOpen(false);
					}}
					currentCurrency={household.currency}
				/>

				<Dialog
					isOpen={isChoreDialogOpen}
					onClose={handleCloseChoreDialog}
					title={editingChore ? "Edit Chore" : "Add Chore"}
					footer={
						<div
							style={{
								display: "flex",
								gap: "0.5rem",
								justifyContent: "flex-end",
								width: "100%",
							}}
						>
							<Button
								variant="outlined"
								onClick={handleCloseChoreDialog}
							>
								{t.cancel}
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleSaveChore}
								disabled={
									!Object.values(choreLabels).every(
										(label) => label.trim() !== "",
									) ||
									Number.isNaN(Number.parseFloat(choreValue))
								}
							>
								{t.confirm}
							</Button>
						</div>
					}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
							paddingTop: "0.5rem",
						}}
					>
						{SUPPORTED_LANGUAGES.map((lang) => (
							<div key={lang.value}>
								<label
									style={{
										display: "block",
										marginBottom: "0.25rem",
									}}
								>
									Chore Name ({lang.emoji} {lang.label})
								</label>
								<Input
									value={choreLabels[lang.value] || ""}
									onChange={(e) =>
										setChoreLabels((prev) => ({
											...prev,
											[lang.value]: e.target.value,
										}))
									}
									placeholder={`e.g. Wash Dishes (${lang.label})`}
									autoFocus={lang.value === "en"}
									style={{ width: "100%" }}
									aria-label={`Chore Name in ${lang.label}`}
								/>
							</div>
						))}
						<div>
							<label
								style={{
									display: "block",
									marginBottom: "0.25rem",
								}}
							>
								Value
							</label>
							<Input
								type="number"
								step="0.01"
								value={choreValue}
								onChange={(e) => setChoreValue(e.target.value)}
								placeholder="e.g. 1.50"
								style={{ width: "100%" }}
							/>
						</div>
						<div>
							<label
								style={{
									display: "block",
									marginBottom: "0.25rem",
								}}
							>
								Category
							</label>
							<Select
								value={choreCategory}
								onChange={(e) =>
									setChoreCategory(
										e.target.value as ChoreCategoryId,
									)
								}
								style={{ width: "100%" }}
								options={Object.entries(CHORE_CATEGORIES).map(
									([id, cat]) => ({
										label: `${cat.emoji} ${cat.labels[language] || cat.labels.en}`,
										value: id,
									}),
								)}
							/>
						</div>
					</div>
				</Dialog>

				<ConfirmDialog
					isOpen={isDeleteChoreConfirmOpen}
					title="Delete Chore"
					message={`Are you sure you want to delete ${choreToDelete?.labels[language] || choreToDelete?.labels.en}?`}
					confirmLabel="Delete"
					cancelLabel={t.cancel}
					variant="danger"
					onConfirm={() => {
						if (choreToDelete) {
							deleteChore(choreToDelete.id);
						}
						setIsDeleteChoreConfirmOpen(false);
						setChoreToDelete(null);
						if (lastFocusedButtonRef.current) {
							requestAnimationFrame(() => {
								lastFocusedButtonRef.current?.focus();
								lastFocusedButtonRef.current = null;
							});
						}
					}}
					onCancel={() => {
						setIsDeleteChoreConfirmOpen(false);
						setChoreToDelete(null);
						if (lastFocusedButtonRef.current) {
							requestAnimationFrame(() => {
								lastFocusedButtonRef.current?.focus();
								lastFocusedButtonRef.current = null;
							});
						}
					}}
				/>
			</PageContainer>
		</>
	);
}
