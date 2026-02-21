import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BackToTop } from "./components/BackToTop";
import { setColorSchemeFromLocalStorage } from "./components/ColorSchemeToggle";
import { DataProvider, useData } from "./context/DataContext";
import {
	LocalizationProvider,
	useLocalization,
} from "./context/LocalizationContext";
import HistoryScreen from "./screens/HistoryScreen";
import { HomeScreen } from "./screens/HomeScreen";
import HouseholdSelectionScreen from "./screens/HouseholdSelectionScreen";
import PeriodSelectionScreen from "./screens/PeriodSelectionScreen";
import SettingsScreen from "./screens/SettingsScreen";

function AppContent() {
	const { currentHousehold, db, selectHousehold } = useData();
	const { t } = useLocalization();

	useEffect(() => {
		setColorSchemeFromLocalStorage();
	}, []);

	if (!currentHousehold) {
		return (
			<HouseholdSelectionScreen
				onSelectHousehold={selectHousehold}
				db={db}
			/>
		);
	}

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<HomeScreen household={currentHousehold} db={db} />
						}
					/>
					<Route path="/settings" element={<SettingsScreen />} />
					<Route
						path="/history"
						element={<PeriodSelectionScreen />}
					/>
					<Route
						path="/history/:periodId"
						element={<HistoryScreen />}
					/>
				</Routes>
			</BrowserRouter>
			<BackToTop label={t.backToTop} />
		</>
	);
}

export default function App() {
	return (
		<DataProvider>
			<LocalizationProvider>
				<AppContent />
			</LocalizationProvider>
		</DataProvider>
	);
}
