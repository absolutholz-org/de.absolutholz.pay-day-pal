import { LOCAL_STORAGE_KEY_PREFIX } from "../../constants";
import type { ColorScheme } from "./_ColorSchemeToggle.types";

export const SCHEME_STORAGE_KEY = `${LOCAL_STORAGE_KEY_PREFIX}colorScheme`;
export const DEFAULT_COLOR_SCHEME: ColorScheme = "system";
export const DATA_COLOR_SCHEME_ATTR = "data-color-scheme";
