import {
	collection,
	doc,
	type Firestore,
	limit,
	onSnapshot,
	query,
	setDoc,
	Timestamp,
	where,
} from "firebase/firestore";
import { Loader, Settings } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/Button";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { LOCAL_STORAGE_KEY_PREFIX } from "../../constants";
import { useLocalization } from "../../context/LocalizationContext";
import { type ChoreData, type Household, type Period } from "../../types";
import { formatDateKey } from "../../utils";
import { ActivePeriodView } from "./_ActivePeriodView";
import { NoActivePeriodView } from "./_NoActivePeriodView";

interface HomeScreenProps {
	household: Household;
	db: Firestore;
}

export function HomeScreen({ db, household }: HomeScreenProps) {
	const [householdData, setHouseholdData] = useState<Household>(household);
	const [choreData, setChoreData] = useState<ChoreData>({});
	const [isSyncing, setIsSyncing] = useState(false);
	const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()));
	const [activePeriod, setActivePeriod] = useState<Period | null>(null);
	const todayKey = formatDateKey(new Date());
	const { t } = useLocalization();

	useEffect(() => {
		const unsub = onSnapshot(
			doc(db, "households", household.id),
			{ includeMetadataChanges: true },
			(docSnap) => {
				if (docSnap.exists()) {
					const data = {
						id: docSnap.id,
						...docSnap.data(),
					} as Household;
					setHouseholdData(data);
					setIsSyncing(docSnap.metadata.fromCache);
				}
			},
		);
		return () => unsub();
	}, [household.id, db]);

	useEffect(() => {
		const q = query(
			collection(db, "households", household.id, "periods"),
			where("endDate", "==", null),
			limit(1),
		);

		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				if (!snapshot.empty) {
					const docData = snapshot.docs[0].data();
					const toDate = (t: Timestamp | Date | null | undefined) =>
						t instanceof Timestamp ? t.toDate() : t;
					const period = {
						id: snapshot.docs[0].id,
						...docData,
						createdAt: toDate(docData.createdAt),
						endDate: toDate(docData.endDate),
						startDate: toDate(docData.startDate),
					} as Period;

					setActivePeriod(period);
				} else {
					setActivePeriod(null);
				}
			},
			(error) => {
				console.error("Error fetching periods:", error);
			},
		);
		return () => unsubscribe();
	}, [household.id, db]);

	const [activeChild, setActiveChild] = useState<string>(() => {
		const saved = localStorage.getItem(
			`${LOCAL_STORAGE_KEY_PREFIX}activeChild_${household.id}`,
		);
		const savedMember = household.members.find((c) => c.id === saved);
		if (savedMember && !savedMember.disabled) {
			return savedMember.id;
		}
		return household.members.find((m) => !m.disabled)?.id || "";
	});

	const periodDates = useMemo(() => {
		if (!activePeriod) return [];

		const start = new Date(activePeriod.startDate);
		const end = new Date(); // Today
		start.setHours(0, 0, 0, 0);
		end.setHours(0, 0, 0, 0);
		const dates: Date[] = [];
		const current = new Date(start);

		if (current > end) return [end];

		while (current <= end) {
			dates.push(new Date(current));
			current.setDate(current.getDate() + 1);
		}
		return dates.reverse();
	}, [activePeriod, todayKey]);

	const chores = householdData.chores;

	useEffect(() => {
		const currentMember = householdData.members.find(
			(m) => m.id === activeChild,
		);
		if (currentMember?.disabled) {
			const firstActive = householdData.members.find((m) => !m.disabled);
			if (firstActive) {
				setActiveChild(firstActive.id);
			}
		}
	}, [householdData, activeChild]);

	useEffect(() => {
		localStorage.setItem(
			`${LOCAL_STORAGE_KEY_PREFIX}activeChild_${householdData.id}`,
			activeChild,
		);
	}, [activeChild, householdData.id]);

	useEffect(() => {
		const docRef = doc(
			db,
			"households",
			householdData.id,
			"activity",
			activeChild,
		);
		const unsubscribe = onSnapshot(
			docRef,
			{ includeMetadataChanges: true },
			(docSnap) => {
				if (docSnap.exists()) {
					setChoreData(docSnap.data() as ChoreData);
				} else {
					setDoc(docRef, {});
				}
				setIsSyncing(docSnap.metadata.fromCache);
			},
			(error) => {
				console.error("Error fetching chores:", error);
			},
		);
		return () => unsubscribe();
	}, [activeChild, householdData.id, db]);

	const calculateTotal = () => {
		let total = 0;
		chores.forEach((chore) => {
			periodDates.forEach((date) => {
				const key = `${formatDateKey(date)}_${chore.id}`;
				const count = Number(choreData[key] || 0);
				total += chore.value * count;
			});
		});
		return total;
	};

	const calculateDailyTotal = (date: Date) => {
		let total = 0;
		const dateKey = formatDateKey(date);
		chores.forEach((chore) => {
			const key = `${dateKey}_${chore.id}`;
			const count = Number(choreData[key] || 0);
			total += chore.value * count;
		});
		return total;
	};

	return (
		<>
			<PageHeader
				title={`Payday Pal for ${householdData.name}`}
				slotMain={<p>{t.trackChores}</p>}
				slotTrail={
					<Button
						as={Link}
						to="/settings"
						variant="text"
						label={t.settings}
						startIcon={<Settings size={24} aria-hidden="true" />}
					/>
				}
			/>
			{isSyncing && (
				<PageContainer>
					<LoadingIndicator>
						<Loader size={20} />
					</LoadingIndicator>
				</PageContainer>
			)}

			{!activePeriod ? (
				<NoActivePeriodView />
			) : (
				<ActivePeriodView
					members={householdData.members}
					activeChild={activeChild}
					setActiveChild={setActiveChild}
					totalBalance={calculateTotal()}
					periodDates={periodDates}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					getDailyTotal={calculateDailyTotal}
					chores={chores}
					choreData={choreData}
				/>
			)}
		</>
	);
}
