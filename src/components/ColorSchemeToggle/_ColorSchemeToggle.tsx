import { useEffect, useState } from "react";

import { useLocalization } from "../../context/LocalizationContext";
import {
	DATA_COLOR_SCHEME_ATTR,
	DEFAULT_COLOR_SCHEME,
	SCHEME_STORAGE_KEY,
} from "./_ColorSchemeToggle.constants";
import { RadioCardGroup } from "../RadioCardGroup";
import type { ColorScheme } from "./_ColorSchemeToggle.types";

export function ColorSchemeToggle() {
	const { t } = useLocalization();
	const [scheme, setScheme] = useState<ColorScheme>(() => {
		const saved = localStorage.getItem(SCHEME_STORAGE_KEY);
		return (saved as ColorScheme) || DEFAULT_COLOR_SCHEME;
	});

	const SCHEMES = [
		{
			value: "system",
			label: t.system,
			icon: "💻",
		},
		{
			value: "light",
			label: t.light,
			icon: "☀️",
		},
		{
			value: "dark",
			label: t.dark,
			icon: "🌙",
		},
	];

	useEffect(() => {
		localStorage.setItem(SCHEME_STORAGE_KEY, scheme);
		const root = document.documentElement;
		if (scheme === DEFAULT_COLOR_SCHEME) {
			root.removeAttribute(DATA_COLOR_SCHEME_ATTR);
		} else {
			root.setAttribute(DATA_COLOR_SCHEME_ATTR, scheme);
		}
	}, [scheme]);

	return (
		<RadioCardGroup
			options={SCHEMES}
			name="appScheme"
			initialValue={scheme}
			onChange={(value) => setScheme(value as ColorScheme)}
		/>
	);
}
