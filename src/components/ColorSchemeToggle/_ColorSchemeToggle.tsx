import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { useLocalization } from "../../context/LocalizationContext";
import * as S from "./_ColorSchemeToggle.styles";
import {
  DATA_COLOR_SCHEME_ATTR,
  DEFAULT_COLOR_SCHEME,
  SCHEME_STORAGE_KEY,
} from "./_ColorSchemeToggle.constants";

export function ColorSchemeToggle() {
  const { t } = useLocalization();
  const [scheme, setScheme] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem(SCHEME_STORAGE_KEY);
    return (saved as ColorScheme) || DEFAULT_COLOR_SCHEME;
  });

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
    <S.ToggleContainer>
      <S.ToggleButton
        active={scheme === "system"}
        onClick={() => setScheme("system")}
      >
        <Monitor size={18} /> {t.system}
      </S.ToggleButton>
      <S.ToggleButton
        active={scheme === "light"}
        onClick={() => setScheme("light")}
      >
        <Sun size={18} /> {t.light}
      </S.ToggleButton>
      <S.ToggleButton
        active={scheme === "dark"}
        onClick={() => setScheme("dark")}
      >
        <Moon size={18} /> {t.dark}
      </S.ToggleButton>
    </S.ToggleContainer>
  );
}
