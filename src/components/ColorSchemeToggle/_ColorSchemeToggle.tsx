import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import * as S from "./_ColorSchemeToggle.styles";

export function ColorSchemeToggle() {
  const [scheme, setScheme] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem("payDayPal_colorScheme");
    return (saved as ColorScheme) || "system";
  });

  useEffect(() => {
    localStorage.setItem("payDayPal_colorScheme", scheme);
    const root = document.documentElement;
    if (scheme === "system") {
      root.removeAttribute("data-color-scheme");
    } else {
      root.setAttribute("data-color-scheme", scheme);
    }
  }, [scheme]);

  return (
    <S.ToggleContainer>
      <S.ToggleButton
        active={scheme === "system"}
        onClick={() => setScheme("system")}
      >
        <Monitor size={18} /> System
      </S.ToggleButton>
      <S.ToggleButton
        active={scheme === "light"}
        onClick={() => setScheme("light")}
      >
        <Sun size={18} /> Light
      </S.ToggleButton>
      <S.ToggleButton
        active={scheme === "dark"}
        onClick={() => setScheme("dark")}
      >
        <Moon size={18} /> Dark
      </S.ToggleButton>
    </S.ToggleContainer>
  );
}
