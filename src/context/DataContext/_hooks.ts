import { useContext } from "react";
import { DataContext } from "./_context";

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
