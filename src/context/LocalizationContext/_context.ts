import { createContext } from "react";

import type { LocalizationContextType } from "./_types";

export const LocalizationContext = createContext<
	LocalizationContextType | undefined
>(undefined);
