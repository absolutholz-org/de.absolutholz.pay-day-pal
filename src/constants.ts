import type {
	Chore,
	ChoreCategory,
	ChoreCategoryId,
	CurrencyExpanded,
	LanguageExpanded,
} from "./types";

export const LOCAL_STORAGE_KEY_PREFIX = "paydayPal_";

export const SUPPORTED_LANGUAGES: LanguageExpanded[] = [
	{ emoji: "🇺🇸", label: "English", value: "en" },
	{ emoji: "🇩🇪", label: "Deutsch", value: "de" },
	{ emoji: "🇧🇷", label: "Português", value: "pt" },
	{ emoji: "🇫🇷", label: "Français", value: "fr" },
];

export const SUPPORTED_CURRENCIES: CurrencyExpanded[] = [
	{ emoji: "💶", label: "Euro", value: "EUR" },
	{ emoji: "💵", label: "US Dollar", value: "USD" },
];

export const CHORE_CATEGORIES: Record<ChoreCategoryId, ChoreCategory> = {
	bathroom: {
		color: "orange",
		emoji: "🛁",
		id: "bathroom",
		labels: {
			de: "Badezimmer",
			en: "Bathroom",
			fr: "Salle de bain",
			pt: "Banheiro",
		},
	},
	bedroom: {
		color: "yellow",
		emoji: "🛏️",
		id: "bedroom",
		labels: {
			de: "Schlafzimmer",
			en: "Bedroom",
			fr: "Chambre",
			pt: "Quarto",
		},
	},
	household: {
		color: "pink",
		emoji: "🏠",
		id: "household",
		labels: {
			de: "Haushalt",
			en: "Household",
			fr: "Ménage",
			pt: "Casa",
		},
	},
	kitchen: {
		color: "green",
		emoji: "🍽️",
		id: "kitchen",
		labels: {
			de: "Küche",
			en: "Kitchen",
			fr: "Cuisine",
			pt: "Cozinha",
		},
	},
	laundry: {
		color: "blue",
		emoji: "👕",
		id: "laundry",
		labels: {
			de: "Wäsche",
			en: "Laundry",
			fr: "Buanderie",
			pt: "Lavanderia",
		},
	},
	"living-room": {
		color: "purple",
		emoji: "🛋️",
		id: "living-room",
		labels: {
			de: "Wohnzimmer",
			en: "Living Room",
			fr: "Salon",
			pt: "Sala de Estar",
		},
	},
	outside: {
		color: "green",
		emoji: "🌳",
		id: "outside",
		labels: {
			de: "Draußen",
			en: "Outside",
			fr: "Extérieur",
			pt: "Exterior",
		},
	},
};

export const DEFAULT_CHORES: Chore[] = [
	{
		category: "bedroom",
		effort: "low",
		frequency: "Daily",
		id: "make-bed",
		labels: {
			de: "Bett machen",
			en: "Make Bed",
			fr: "Faire le lit",
			pt: "Arrumar a cama",
		},
		value: 0.25,
	},
	{
		category: "laundry",
		effort: "medium",
		frequency: "2x/Week",
		id: "laundry-hang",
		labels: {
			de: "Wäsche aufhängen",
			en: "Hang Laundry",
			fr: "Étendre le linge",
			pt: "Estender a roupa",
		},
		value: 1.25,
	},
	{
		category: "laundry",
		effort: "medium",
		frequency: "2x/Week",
		id: "laundry-fold",
		labels: {
			de: "Wäsche falten",
			en: "Fold Laundry",
			fr: "Plier le linge",
			pt: "Dobrar a roupa",
		},
		value: 2,
	},
	{
		category: "laundry",
		effort: "low",
		frequency: "2x/Week",
		id: "laundry-put-away",
		labels: {
			de: "Wäsche wegräumen",
			en: "Put Away Laundry",
			fr: "Ranger le linge",
			pt: "Guardar a roupa",
		},
		value: 0.25,
	},
	{
		category: "kitchen",
		effort: "medium",
		frequency: "3x/Week",
		id: "dishwasher-empty",
		labels: {
			de: "Spülmaschine ausräumen",
			en: "Empty the Dishwasher",
			fr: "Vider le lave-vaisselle",
			pt: "Esvaziar a máquina de lavar louça",
		},
		value: 1,
	},
	{
		category: "kitchen",
		effort: "low",
		frequency: "Daily",
		id: "table-set",
		labels: {
			de: "Tisch decken",
			en: "Set Table",
			fr: "Mettre la table",
			pt: "Pôr a mesa",
		},
		value: 0.25,
	},
	{
		category: "kitchen",
		effort: "low",
		frequency: "Daily",
		id: "table-clean",
		labels: {
			de: "Tisch abräumen",
			en: "Clean Table",
			fr: "Débarrasser la table",
			pt: "Limpar a mesa",
		},
		value: 0.25,
	},
	{
		category: "living-room",
		effort: "medium",
		frequency: "Daily",
		id: "tidy-living-room",
		labels: {
			de: "Wohnzimmer aufräumen",
			en: "Tidy-up the Living Room",
			fr: "Ranger le salon",
			pt: "Arrumar a sala",
		},
		value: 0.5,
	},
	{
		category: "bedroom",
		effort: "medium",
		frequency: "Daily",
		id: "tidy-bedroom",
		labels: {
			de: "Schlafzimmer aufräumen",
			en: "Tidy-up the Bedroom",
			fr: "Ranger la chambre",
			pt: "Arrumar o quarto",
		},
		value: 0.5,
	},
	{
		category: "bathroom",
		effort: "medium",
		frequency: "Weekly",
		id: "bathroom-sink-clean",
		labels: {
			de: "Waschbecken reinigen",
			en: "Clean the Bathroom Sink",
			fr: "Nettoyer le lavabo",
			pt: "Limpar o lavatório",
		},
		value: 1,
	},
	{
		category: "household",
		effort: "high",
		frequency: "Weekly",
		id: "vacuuming",
		labels: {
			de: "Staubsaugen",
			en: "Vacuum Floors",
			fr: "Passer l’aspirateur",
			pt: "Aspirar o chão",
		},
		value: 2.5,
	},
	{
		category: "household",
		effort: "high",
		frequency: "2x/Week",
		id: "trash-out",
		labels: {
			de: "Müll rausbringen",
			en: "Take out the Trash",
			fr: "Sortir les poubelles",
			pt: "Tirar o lixo",
		},
		value: 1.5,
	},
];
