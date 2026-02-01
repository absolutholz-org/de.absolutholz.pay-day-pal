import { Language } from "../types";

export type TranslationKey =
  | "settings"
  | "appearance"
  | "household"
  | "name"
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
  | "backToHistory";

export const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  en: {
    settings: "Settings",
    appearance: "Appearance",
    household: "Household",
    name: "Name",
    members: "Members",
    newMemberName: "New Member Name",
    periodManagement: "Period Management",
    viewHistory: "View History",
    endPeriod: "End Period (Payday)",
    leaveHousehold: "Leave Household",
    leaveHouseholdConfirmTitle: "Leave Household?",
    leaveHouseholdConfirmMessage:
      "Are you sure you want to leave this household? You will need to select it again from the main menu to return.",
    leave: "Leave",
    paydayTitle: "Payday!",
    paydayMessage: "Are you sure you want to end the current pay period?",
    confirm: "Confirm",
    startNewPeriod: "Start a new period immediately",
    disable: "Disable",
    enable: "Enable",
    trackChores: "Track chores and earn your allowance!",
    noActivePeriod: "No active period.",
    startNewPeriodButton: "Start New Period",
    currentEarnings: "Current Earnings",
    totalEarned: "Total Earned",
    language: "Language",
    appLanguage: "App Language",
    householdLanguage: "Household Language",
    cancel: "Cancel",
    startNewPeriodDescription: "Start a new period to track chores.",
    system: "System",
    light: "Light",
    dark: "Dark",
    today: "Today",
    increase: "Increase count",
    decrease: "Decrease count",
    addMember: "Add Member",
    backToHome: "Back to Home",
    backToSettings: "Back to Settings",
    backToHistory: "Back to History",
  },
  de: {
    settings: "Einstellungen",
    appearance: "Erscheinungsbild",
    household: "Haushalt",
    name: "Name",
    members: "Mitglieder",
    newMemberName: "Neuer Name",
    periodManagement: "Zeitraumverwaltung",
    viewHistory: "Verlauf anzeigen",
    endPeriod: "Zeitraum beenden (Zahltag)",
    leaveHousehold: "Haushalt verlassen",
    leaveHouseholdConfirmTitle: "Haushalt verlassen?",
    leaveHouseholdConfirmMessage:
      "Bist du sicher, dass du diesen Haushalt verlassen möchtest? Du musst ihn im Hauptmenü erneut auswählen, um zurückzukehren.",
    leave: "Verlassen",
    paydayTitle: "Zahltag!",
    paydayMessage:
      "Bist du sicher, dass du den aktuellen Zahlungszeitraum beenden möchtest?",
    confirm: "Bestätigen",
    startNewPeriod: "Sofort einen neuen Zeitraum beginnen",
    disable: "Deaktivieren",
    enable: "Aktivieren",
    trackChores: "Erledige Aufgaben und verdiene dein Taschengeld!",
    noActivePeriod: "Kein aktiver Zeitraum.",
    startNewPeriodButton: "Neuen Zeitraum starten",
    currentEarnings: "Aktueller Verdienst",
    totalEarned: "Gesamtverdienst",
    language: "Sprache",
    appLanguage: "App-Sprache",
    householdLanguage: "Haushaltssprache",
    cancel: "Abbrechen",
    startNewPeriodDescription:
      "Starte einen neuen Zeitraum, um Aufgaben zu erfassen.",
    system: "System",
    light: "Hell",
    dark: "Dunkel",
    today: "Heute",
    increase: "Anzahl erhöhen",
    decrease: "Anzahl verringern",
    addMember: "Mitglied hinzufügen",
    backToHome: "Zurück zur Startseite",
    backToSettings: "Zurück zu Einstellungen",
    backToHistory: "Zurück zum Verlauf",
  },
  fr: {
    settings: "Paramètres",
    appearance: "Apparence",
    household: "Ménage",
    name: "Nom",
    members: "Membres",
    newMemberName: "Nouveau nom",
    periodManagement: "Gestion de la période",
    viewHistory: "Voir l'historique",
    endPeriod: "Fin de période (Jour de paie)",
    leaveHousehold: "Quitter le ménage",
    leaveHouseholdConfirmTitle: "Quitter le ménage ?",
    leaveHouseholdConfirmMessage:
      "Êtes-vous sûr de vouloir quitter ce ménage ? Vous devrez le sélectionner à nouveau dans le menu principal pour y revenir.",
    leave: "Quitter",
    paydayTitle: "Jour de paie !",
    paydayMessage:
      "Êtes-vous sûr de vouloir terminer la période de paie actuelle ?",
    confirm: "Confirmer",
    startNewPeriod: "Commencer une nouvelle période immédiatement",
    disable: "Désactiver",
    enable: "Activer",
    trackChores: "Suivez les corvées et gagnez votre argent de poche !",
    noActivePeriod: "Aucune période active.",
    startNewPeriodButton: "Commencer une nouvelle période",
    currentEarnings: "Gains actuels",
    totalEarned: "Total gagné",
    language: "Langue",
    appLanguage: "Langue de l'application",
    householdLanguage: "Langue du ménage",
    cancel: "Annuler",
    startNewPeriodDescription:
      "Commencez une nouvelle période pour suivre les corvées.",
    system: "Système",
    light: "Clair",
    dark: "Sombre",
    today: "Aujourd'hui",
    increase: "Augmenter",
    decrease: "Diminuer",
    addMember: "Ajouter un membre",
    backToHome: "Retour à l'accueil",
    backToSettings: "Retour aux paramètres",
    backToHistory: "Retour à l'historique",
  },
  pt: {
    settings: "Configurações",
    appearance: "Aparência",
    household: "Família",
    name: "Nome",
    members: "Membros",
    newMemberName: "Novo Nome",
    periodManagement: "Gestão de Período",
    viewHistory: "Ver Histórico",
    endPeriod: "Encerrar Período (Dia de Pagamento)",
    leaveHousehold: "Sair da Família",
    leaveHouseholdConfirmTitle: "Sair da Família?",
    leaveHouseholdConfirmMessage:
      "Tem certeza de que deseja sair desta família? Você precisará selecioná-la novamente no menu principal para retornar.",
    leave: "Sair",
    paydayTitle: "Dia de Pagamento!",
    paydayMessage:
      "Tem certeza de que deseja encerrar o período de pagamento atual?",
    confirm: "Confirmar",
    startNewPeriod: "Iniciar um novo período imediatamente",
    disable: "Desativar",
    enable: "Ativar",
    trackChores: "Acompanhe as tarefas e ganhe sua mesada!",
    noActivePeriod: "Nenhum período ativo.",
    startNewPeriodButton: "Iniciar Novo Período",
    currentEarnings: "Ganhos Atuais",
    totalEarned: "Total Ganho",
    language: "Idioma",
    appLanguage: "Idioma do App",
    householdLanguage: "Idioma da Família",
    cancel: "Cancelar",
    startNewPeriodDescription:
      "Inicie um novo período para acompanhar as tarefas.",
    system: "Sistema",
    light: "Claro",
    dark: "Escuro",
    today: "Hoje",
    increase: "Aumentar",
    decrease: "Diminuir",
    addMember: "Adicionar Membro",
    backToHome: "Voltar para o Início",
    backToSettings: "Voltar para Configurações",
    backToHistory: "Voltar para o Histórico",
  },
};
