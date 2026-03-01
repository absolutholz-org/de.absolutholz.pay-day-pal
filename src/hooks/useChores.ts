import { doc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";

import { useData } from "../context/DataContext";
import type { Chore } from "../types";

export function useChores() {
	const { currentHousehold, db, selectHousehold } = useData();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const getHouseholdRef = useCallback(() => {
		if (!currentHousehold) throw new Error("No household selected");
		return doc(db, "households", currentHousehold.id);
	}, [currentHousehold, db]);

	const addChore = async (chore: Omit<Chore, "id">) => {
		if (!currentHousehold) return;
		setLoading(true);
		setError(null);
		try {
			const activeChores = currentHousehold.chores || [];
			// Generate a simple ID logic similar to how members are done
			const newId = `chore-${Date.now()}`;
			const newChore: Chore = { ...chore, id: newId };

			// Optimistically update
			const newChores = [...activeChores, newChore];

			await updateDoc(getHouseholdRef(), { chores: newChores });

			selectHousehold({ ...currentHousehold, chores: newChores });
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("Failed to add chore"),
			);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const updateChore = async (choreId: string, updates: Partial<Chore>) => {
		if (!currentHousehold) return;
		setLoading(true);
		setError(null);
		try {
			const activeChores = currentHousehold.chores || [];
			const newChores = activeChores.map((chore) =>
				chore.id === choreId ? { ...chore, ...updates } : chore,
			);

			await updateDoc(getHouseholdRef(), { chores: newChores });
			selectHousehold({ ...currentHousehold, chores: newChores });
		} catch (err) {
			setError(
				err instanceof Error
					? err
					: new Error("Failed to update chore"),
			);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const deleteChore = async (choreId: string) => {
		if (!currentHousehold) return;
		setLoading(true);
		setError(null);
		try {
			const activeChores = currentHousehold.chores || [];
			const newChores = activeChores.filter(
				(chore) => chore.id !== choreId,
			);

			await updateDoc(getHouseholdRef(), { chores: newChores });
			selectHousehold({ ...currentHousehold, chores: newChores });
		} catch (err) {
			setError(
				err instanceof Error
					? err
					: new Error("Failed to delete chore"),
			);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return {
		addChore,
		chores: currentHousehold?.chores || [],
		deleteChore,
		error,
		loading,
		updateChore,
	};
}
