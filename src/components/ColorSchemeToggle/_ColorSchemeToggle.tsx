import { useEffect, useState } from "react";

import { useLocalization } from "../../context/LocalizationContext";
import { RadioCardGroup } from "../RadioCardGroup";
import {
	DATA_COLOR_SCHEME_ATTR,
	DEFAULT_COLOR_SCHEME,
	SCHEME_STORAGE_KEY,
} from "./_ColorSchemeToggle.constants";
import type { ColorScheme } from "./_ColorSchemeToggle.types";

export function ColorSchemeToggle() {
	const { t } = useLocalization();
	const [scheme, setScheme] = useState<ColorScheme>(() => {
		const saved = localStorage.getItem(SCHEME_STORAGE_KEY);
		return (saved as ColorScheme) || DEFAULT_COLOR_SCHEME;
	});

	const SCHEMES = [
		{
			icon: "💻",
			label: t.system,
			value: "system",
		},
		{
			icon: "☀️",
			label: t.light,
			value: "light",
		},
		{
			icon: "🌙",
			label: t.dark,
			value: "dark",
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
