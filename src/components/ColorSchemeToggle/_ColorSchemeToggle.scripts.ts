import {
  DATA_COLOR_SCHEME_ATTR,
  DEFAULT_COLOR_SCHEME,
  SCHEME_STORAGE_KEY,
} from "./_ColorSchemeToggle.constants";

export function setColorSchemeFromLocalStorage() {
  const savedScheme = localStorage.getItem(SCHEME_STORAGE_KEY);

  if (savedScheme && savedScheme !== DEFAULT_COLOR_SCHEME) {
    document.documentElement.setAttribute(DATA_COLOR_SCHEME_ATTR, savedScheme);
  } else {
    document.documentElement.removeAttribute(DATA_COLOR_SCHEME_ATTR);
  }
}
