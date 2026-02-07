import { createContext } from "react";
import { DataContextType } from "./_types";

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);
