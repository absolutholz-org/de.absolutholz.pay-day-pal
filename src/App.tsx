import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/HomeScreen";
import HouseholdSelectionScreen from "./screens/HouseholdSelectionScreen";
import HistoryDetailScreen from "./screens/HistoryDetailScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { setColorSchemeFromLocalStorage } from "./components/ColorSchemeToggle";
import { DataProvider, useData } from "./context/DataContext";

function AppContent() {
  const { currentHousehold, selectHousehold, db } = useData();

  useEffect(() => {
    setColorSchemeFromLocalStorage();
  }, []);

  if (!currentHousehold) {
    return (
      <HouseholdSelectionScreen onSelectHousehold={selectHousehold} db={db} />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomeScreen household={currentHousehold} db={db} />}
        />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/history/:periodId" element={<HistoryDetailScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
