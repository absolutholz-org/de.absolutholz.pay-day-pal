import { type Language } from "../types";

export type TranslationKey =
	| "settings"
	| "about"
	| "appVersion"
	| "appearance"
	| "household"
	| "householdName"
	| "editHouseholdName"
	| "members"
	| "newMemberName"
	| "periodManagement"
	| "viewHistory"
	| "endPeriod"
	| "leaveHousehold"
	| "leaveHouseholdConfirmTitle"
	| "leaveHouseholdConfirmMessage"
	| "leave"
	| "paydayTitle"
	| "paydayMessage"
	| "confirm"
	| "startNewPeriod"
	| "disable"
	| "enable"
	| "trackChores"
	| "noActivePeriod"
	| "startNewPeriodButton"
	| "currentEarnings"
	| "totalEarned"
	| "language"
	| "appLanguage"
	| "householdLanguage"
	| "editHouseholdLanguage"
	| "householdCurrency"
	| "editHouseholdCurrency"
	| "cancel"
	| "startNewPeriodDescription"
	| "system"
	| "light"
	| "dark"
	| "today"
	| "increase"
	| "decrease"
	| "addMember"
	| "backToHome"
	| "backToSettings"
	| "backToHistory"
	| "backToTop"
	| "selectPeriod";

export const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
	de: {
		about: "Über",
		addMember: "Mitglied hinzufügen",
		appearance: "Erscheinungsbild",
		appLanguage: "App-Sprache",
		appVersion: "App-Version",
		backToHistory: "Zurück zum Verlauf",
		backToHome: "Zurück zur Startseite",
		backToSettings: "Zurück zu Einstellungen",
		backToTop: "Nach oben",
		cancel: "Abbrechen",
		confirm: "Bestätigen",
		currentEarnings: "Aktueller Verdienst",
		dark: "Dunkel",
		decrease: "Anzahl verringern",
		disable: "Deaktivieren",
		editHouseholdCurrency: "Währung bearbeiten",
		editHouseholdLanguage: "Sprache bearbeiten",
		editHouseholdName: "Haushaltnamen bearbeiten",
		enable: "Aktivieren",
		endPeriod: "Zeitraum beenden (Zahltag)",
		household: "Haushalt",
		householdCurrency: "Währung",
		householdLanguage: "Sprache",
		householdName: "Name",
		increase: "Anzahl erhöhen",
		language: "Sprache",
		leave: "Verlassen",
		leaveHousehold: "Haushalt verlassen",
		leaveHouseholdConfirmMessage:
			"Bist du sicher, dass du diesen Haushalt verlassen möchtest? Du musst ihn im Hauptmenü erneut auswählen, um zurückzukehren.",
		leaveHouseholdConfirmTitle: "Haushalt verlassen?",
		light: "Hell",
		members: "Mitglieder",
		newMemberName: "Neuer Name",
		noActivePeriod: "Kein aktiver Zeitraum.",
		paydayMessage:
			"Bist du sicher, dass du den aktuellen Zahlungszeitraum beenden möchtest?",
		paydayTitle: "Zahltag!",
		periodManagement: "Zeitraumverwaltung",
		selectPeriod: "Zeitraum auswählen",
		settings: "Einstellungen",
		startNewPeriod: "Sofort einen neuen Zeitraum beginnen",
		startNewPeriodButton: "Neuen Zeitraum starten",
		startNewPeriodDescription:
			"Starte einen neuen Zeitraum, um Aufgaben zu erfassen.",
		system: "System",
		today: "Heute",
		totalEarned: "Gesamtverdienst",
		trackChores: "Erledige Aufgaben und verdiene dein Taschengeld!",
		viewHistory: "Verlauf anzeigen",
	},
	en: {
		about: "About",
		addMember: "Add Member",
		appearance: "Appearance",
		appLanguage: "App Language",
		appVersion: "App Version",
		backToHistory: "Back to History",
		backToHome: "Back to Home",
		backToSettings: "Back to Settings",
		backToTop: "Back to top",
		cancel: "Cancel",
		confirm: "Confirm",
		currentEarnings: "Current Earnings",
		dark: "Dark",
		decrease: "Decrease count",
		disable: "Disable",
		editHouseholdCurrency: "Edit currency",
		editHouseholdLanguage: "Edit language",
		editHouseholdName: "Edit household name",
		enable: "Enable",
		endPeriod: "End Period (Payday)",
		household: "Household",
		householdCurrency: "Currency",
		householdLanguage: "Language",
		householdName: "Name",
		increase: "Increase count",
		language: "Language",
		leave: "Leave",
		leaveHousehold: "Leave Household",
		leaveHouseholdConfirmMessage:
			"Are you sure you want to leave this household? You will need to select it again from the main menu to return.",
		leaveHouseholdConfirmTitle: "Leave Household?",
		light: "Light",
		members: "Members",
		newMemberName: "New Member Name",
		noActivePeriod: "No active period.",
		paydayMessage: "Are you sure you want to end the current pay period?",
		paydayTitle: "Payday!",
		periodManagement: "Period Management",
		selectPeriod: "Select a Period",
		settings: "Settings",
		startNewPeriod: "Start a new period immediately",
		startNewPeriodButton: "Start New Period",
		startNewPeriodDescription: "Start a new period to track chores.",
		system: "System",
		today: "Today",
		totalEarned: "Total Earned",
		trackChores: "Track chores and earn your allowance!",
		viewHistory: "View History",
	},
	fr: {
		about: "À propos",
		addMember: "Ajouter un membre",
		appearance: "Apparence",
		appLanguage: "Langue de l'application",
		appVersion: "Version de l'application",
		backToHistory: "Retour à l'historique",
		backToHome: "Retour à l'accueil",
		backToSettings: "Retour aux paramètres",
		backToTop: "Retour en haut",
		cancel: "Annuler",
		confirm: "Confirmer",
		currentEarnings: "Gains actuels",
		dark: "Sombre",
		decrease: "Diminuer",
		disable: "Désactiver",
		editHouseholdCurrency: "Modifier la devise",
		editHouseholdLanguage: "Modifier la langue",
		editHouseholdName: "Modifier le nom du ménage",
		enable: "Activer",
		endPeriod: "Fin de période (Jour de paie)",
		household: "Ménage",
		householdCurrency: "Devise",
		householdLanguage: "Langue",
		householdName: "Nom",
		increase: "Augmenter",
		language: "Langue",
		leave: "Quitter",
		leaveHousehold: "Quitter le ménage",
		leaveHouseholdConfirmMessage:
			"Êtes-vous sûr de vouloir quitter ce ménage ? Vous devrez le sélectionner à nouveau dans le menu principal pour y revenir.",
		leaveHouseholdConfirmTitle: "Quitter le ménage ?",
		light: "Clair",
		members: "Membres",
		newMemberName: "Nouveau nom",
		noActivePeriod: "Aucune période active.",
		paydayMessage:
			"Êtes-vous sûr de vouloir terminer la période de paie actuelle ?",
		paydayTitle: "Jour de paie !",
		periodManagement: "Gestion de la période",
		selectPeriod: "Sélectionner une période",
		settings: "Paramètres",
		startNewPeriod: "Commencer une nouvelle période immédiatement",
		startNewPeriodButton: "Commencer une nouvelle période",
		startNewPeriodDescription:
			"Commencez une nouvelle période pour suivre les corvées.",
		system: "Système",
		today: "Aujourd'hui",
		totalEarned: "Total gagné",
		trackChores: "Suivez les corvées et gagnez votre argent de poche !",
		viewHistory: "Voir l'historique",
	},
	pt: {
		about: "Sobre",
		addMember: "Adicionar Membro",
		appearance: "Aparência",
		appLanguage: "Idioma do App",
		appVersion: "Versão do App",
		backToHistory: "Voltar para o Histórico",
		backToHome: "Voltar para o Início",
		backToSettings: "Voltar para Configurações",
		backToTop: "Voltar ao topo",
		cancel: "Cancelar",
		confirm: "Confirmar",
		currentEarnings: "Ganhos Atuais",
		dark: "Escuro",
		decrease: "Diminuir",
		disable: "Desativar",
		editHouseholdCurrency: "Editar moeda",
		editHouseholdLanguage: "Editar idioma",
		editHouseholdName: "Editar nome da Família",
		enable: "Ativar",
		endPeriod: "Encerrar Período (Dia de Pagamento)",
		household: "Família",
		householdCurrency: "Moeda",
		householdLanguage: "Idioma",
		householdName: "Nome",
		increase: "Aumentar",
		language: "Idioma",
		leave: "Sair",
		leaveHousehold: "Sair da Família",
		leaveHouseholdConfirmMessage:
			"Tem certeza de que deseja sair desta família? Você precisará selecioná-la novamente no menu principal para retornar.",
		leaveHouseholdConfirmTitle: "Sair da Família?",
		light: "Claro",
		members: "Membros",
		newMemberName: "Novo Nome",
		noActivePeriod: "Nenhum período ativo.",
		paydayMessage:
			"Tem certeza de que deseja encerrar o período de pagamento atual?",
		paydayTitle: "Dia de Pagamento!",
		periodManagement: "Gestão de Período",
		selectPeriod: "Selecionar um Período",
		settings: "Configurações",
		startNewPeriod: "Iniciar um novo período imediatamente",
		startNewPeriodButton: "Iniciar Novo Período",
		startNewPeriodDescription:
			"Inicie um novo período para acompanhar as tarefas.",
		system: "Sistema",
		today: "Hoje",
		totalEarned: "Total Ganho",
		trackChores: "Acompanhe as tarefas e ganhe sua mesada!",
		viewHistory: "Ver Histórico",
	},
};
