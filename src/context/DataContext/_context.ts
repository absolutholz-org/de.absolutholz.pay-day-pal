import { createContext } from "react";

import type { DataContextType } from "./_types";

export const DataContext = createContext<DataContextType | undefined>(
	undefined,
);
