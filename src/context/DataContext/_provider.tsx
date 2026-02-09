import { initializeApp } from "firebase/app";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	increment,
	initializeFirestore,
	limit,
	orderBy,
	persistentLocalCache,
	query,
	Timestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import { ReactNode, useState } from "react";
import {
	AccentColor,
	ActivityRecord,
	ChoreData,
	Currency,
	Household,
	HouseholdMember,
	Language,
	Period,
} from "../../types";
import { formatDateKey } from "../../utils";
import { DataContext } from "./_context";
import { Activity } from "./_types";
import { LOCAL_STORAGE_KEY_PREFIX } from "../../constants";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
	localCache: persistentLocalCache(),
});

const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_KEY_PREFIX}selectedHouseholdId`;

const toDate = (t: Timestamp | Date | null | undefined) =>
	t instanceof Timestamp ? t.toDate() : t;

export function DataProvider({ children }: { children: ReactNode }) {
	const [currentHousehold, setCurrentHousehold] = useState<Household | null>(
		null,
	);

	const selectHousehold = (household: Household) => {
		setCurrentHousehold(household);
		localStorage.setItem(LOCAL_STORAGE_KEY, household.id);
	};

	const leaveHousehold = () => {
		setCurrentHousehold(null);
		localStorage.removeItem(LOCAL_STORAGE_KEY);
	};

	const updateHouseholdName = async (name: string) => {
		if (!currentHousehold) return;
		const trimmedName = name.trim();
		if (trimmedName !== currentHousehold.name) {
			await updateDoc(doc(db, "households", currentHousehold.id), {
				name: trimmedName,
			});
			setCurrentHousehold({ ...currentHousehold, name: trimmedName });
		}
	};

	const updateHouseholdLanguage = async (language: Language) => {
		if (!currentHousehold) return;
		if (language !== currentHousehold.language) {
			await updateDoc(doc(db, "households", currentHousehold.id), {
				language,
			});
			setCurrentHousehold({ ...currentHousehold, language });
		}
	};

	const updateHouseholdCurrency = async (currency: Currency) => {
		if (!currentHousehold) return;
		if (currency !== currentHousehold.currency) {
			await updateDoc(doc(db, "households", currentHousehold.id), {
				currency,
			});
			setCurrentHousehold({ ...currentHousehold, currency });
		}
	};

	const addMember = async (
		name: string,
		emoji: string,
		color: AccentColor,
	) => {
		if (!currentHousehold) return;
		const trimmedName = name.trim();
		if (trimmedName) {
			const newId = trimmedName.toLowerCase().replace(/\s+/g, "-");
			const newMember: HouseholdMember = {
				id: newId,
				name: trimmedName,
				emoji,
				color,
			};
			const newMembers = [...currentHousehold.members, newMember];
			await updateDoc(doc(db, "households", currentHousehold.id), {
				members: newMembers,
			});
			setCurrentHousehold({ ...currentHousehold, members: newMembers });
		}
	};

	const toggleMemberStatus = async (memberId: string) => {
		if (!currentHousehold) return;
		const newMembers = currentHousehold.members.map((m) =>
			m.id === memberId ? { ...m, disabled: !m.disabled } : m,
		);
		await updateDoc(doc(db, "households", currentHousehold.id), {
			members: newMembers,
		});
		setCurrentHousehold({ ...currentHousehold, members: newMembers });
	};

	const updateMember = async (
		memberId: string,
		data: Partial<HouseholdMember>,
	) => {
		if (!currentHousehold) return;
		const newMembers = currentHousehold.members.map((m) =>
			m.id === memberId ? { ...m, ...data } : m,
		);
		await updateDoc(doc(db, "households", currentHousehold.id), {
			members: newMembers,
		});
		setCurrentHousehold({ ...currentHousehold, members: newMembers });
	};

	const finishPeriod = async (startNew: boolean) => {
		if (!currentHousehold) return;

		const periodsRef = collection(
			db,
			"households",
			currentHousehold.id,
			"periods",
		);
		const q = query(periodsRef, where("endDate", "==", null));
		const snapshot = await getDocs(q);

		const now = new Date();

		const updates = snapshot.docs.map((doc) =>
			updateDoc(doc.ref, { endDate: now }),
		);
		await Promise.all(updates);

		if (startNew) {
			await addDoc(periodsRef, {
				startDate: now,
				endDate: null,
				createdAt: now,
			});
		}
	};

	const getPastPeriods = async () => {
		if (!currentHousehold) return [];
		const periodsRef = collection(
			db,
			"households",
			currentHousehold.id,
			"periods",
		);
		const q = query(periodsRef, orderBy("startDate", "desc"));
		const snapshot = await getDocs(q);
		return snapshot.docs
			.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					...data,
					startDate: toDate(data.startDate),
					endDate: toDate(data.endDate),
					createdAt: toDate(data.createdAt),
				} as Period;
			})
			.filter((p) => p.endDate);
	};

	const addActivityRecord = async (
		memberId: string,
		choreId: string,
		dateKey: string,
	) => {
		if (!currentHousehold) return;
		const chore = currentHousehold.chores.find((c) => c.id === choreId);
		if (!chore) return;

		const activityRef = doc(
			db,
			"households",
			currentHousehold.id,
			"activity",
			memberId,
		);

		await addDoc(
			collection(
				db,
				"households",
				currentHousehold.id,
				"activity_records",
			),
			{
				memberId,
				choreId,
				date: dateKey,
				createdAt: new Date(),
				value: chore.value,
				choreLabel:
					chore.labels[currentHousehold.language] ||
					chore.labels["en"],
			},
		);
		await updateDoc(activityRef, {
			[`${dateKey}_${choreId}`]: increment(1),
		});
	};

	const removeActivityRecord = async (
		memberId: string,
		choreId: string,
		dateKey: string,
	) => {
		if (!currentHousehold) return;

		const activityRef = doc(
			db,
			"households",
			currentHousehold.id,
			"activity",
			memberId,
		);

		const recordsRef = collection(
			db,
			"households",
			currentHousehold.id,
			"activity_records",
		);
		const q = query(
			recordsRef,
			where("memberId", "==", memberId),
			where("choreId", "==", choreId),
			where("date", "==", dateKey),
			limit(1),
		);
		const snapshot = await getDocs(q);
		if (!snapshot.empty) {
			await deleteDoc(snapshot.docs[0].ref);
		}
		await updateDoc(activityRef, {
			[`${dateKey}_${choreId}`]: increment(-1),
		});
	};

	const getRecentActivities = async (limitCount = 50) => {
		if (!currentHousehold) return [];
		const recordsRef = collection(
			db,
			"households",
			currentHousehold.id,
			"activity_records",
		);
		const q = query(
			recordsRef,
			orderBy("createdAt", "desc"),
			limit(limitCount),
		);
		const snapshot = await getDocs(q);

		const activities: Activity[] = [];
		snapshot.forEach((doc) => {
			const data = doc.data() as ActivityRecord;
			const member = currentHousehold.members.find(
				(m) => m.id === data.memberId,
			);
			if (member) {
				activities.push({
					id: doc.id,
					date: data.date,
					memberId: data.memberId,
					memberName: member.name,
					choreLabel: data.choreLabel,
					value: data.value,
				});
			}
		});
		return activities;
	};

	const getPeriodActivities = async (periodId: string) => {
		if (!currentHousehold) throw new Error("No household selected");

		const periodDoc = await getDoc(
			doc(db, "households", currentHousehold.id, "periods", periodId),
		);

		if (!periodDoc.exists()) {
			throw new Error("Period not found");
		}

		const pData = periodDoc.data();
		const period = {
			id: periodDoc.id,
			...pData,
			startDate: toDate(pData?.startDate),
			endDate: toDate(pData?.endDate),
			createdAt: toDate(pData?.createdAt),
		} as Period;

		const start = new Date(period.startDate);
		const end = period.endDate ? new Date(period.endDate) : new Date();
		const startKey = formatDateKey(start);
		const endKey = formatDateKey(end);

		// Try fetching from activity_records first
		const recordsRef = collection(
			db,
			"households",
			currentHousehold.id,
			"activity_records",
		);
		const q = query(
			recordsRef,
			where("date", ">=", startKey),
			where("date", "<=", endKey),
		);
		const snapshot = await getDocs(q);

		const activities: Activity[] = [];

		if (!snapshot.empty) {
			snapshot.forEach((doc) => {
				const data = doc.data() as ActivityRecord;
				const member = currentHousehold.members.find(
					(m) => m.id === data.memberId,
				);
				if (member) {
					activities.push({
						id: doc.id,
						date: data.date,
						memberId: data.memberId,
						memberName: member.name,
						choreLabel: data.choreLabel,
						value: data.value,
					});
				}
			});
			activities.sort((a, b) => a.date.localeCompare(b.date));
		} else {
			// Fallback to old logic for periods before /* activity */_records
			const memberActivity: Record<string, ChoreData> = {};
			await Promise.all(
				currentHousehold.members.map(async (member) => {
					const activityDoc = await getDoc(
						doc(
							db,
							"households",
							currentHousehold.id,
							"activity",
							member.id,
						),
					);
					if (activityDoc.exists()) {
						memberActivity[member.id] =
							activityDoc.data() as ChoreData;
					}
				}),
			);

			start.setHours(0, 0, 0, 0);
			end.setHours(0, 0, 0, 0);

			const dates: string[] = [];
			const current = new Date(start);

			while (current <= end) {
				dates.push(formatDateKey(new Date(current)));
				current.setDate(current.getDate() + 1);
			}

			dates.forEach((dateKey) => {
				currentHousehold.members.forEach((member) => {
					const data = memberActivity[member.id] || {};
					currentHousehold.chores.forEach((chore) => {
						const key = `${dateKey}_${chore.id}`;
						const count = Number(data[key] || 0);
						if (count > 0 && chore.value > 0) {
							for (let i = 0; i < count; i++) {
								activities.push({
									id: `${member.id}_${key}_${i}`,
									date: dateKey,
									memberId: member.id,
									memberName: member.name,
									choreLabel: chore.labels["en"],
									value: chore.value,
								});
							}
						}
					});
				});
			});
		}

		return { period, activities };
	};

	return (
		<DataContext.Provider
			value={{
				db,
				currentHousehold,
				selectHousehold,
				leaveHousehold,
				updateHouseholdName,
				updateHouseholdLanguage,
				updateHouseholdCurrency,
				addMember,
				toggleMemberStatus,
				updateMember,
				finishPeriod,
				getPastPeriods,
				getPeriodActivities,
				addActivityRecord,
				removeActivityRecord,
				getRecentActivities,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}
