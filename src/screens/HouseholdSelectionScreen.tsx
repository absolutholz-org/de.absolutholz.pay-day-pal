import {
	addDoc,
	collection,
	type Firestore,
	onSnapshot,
} from "firebase/firestore";
import { Loader, Plus, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { Select } from "../components/Select";
import {
	DEFAULT_CHORES,
	LOCAL_STORAGE_KEY_PREFIX,
	SUPPORTED_LANGUAGES,
} from "../constants";
import {
	Card,
	CardMeta,
	CardTitle,
	FormGroup,
	IconButton,
	LoadingIndicator,
	Subtitle,
} from "../globalStyles";
import { type AccentColor, type Household, type Language } from "../types";

const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_KEY_PREFIX}selectedHouseholdId`;

export default function HouseholdSelectionScreen({
	db,
	onSelectHousehold,
}: {
	onSelectHousehold: (household: Household) => void;
	db: Firestore;
}) {
	const [view, setView] = useState<"list" | "create">("list");
	const [households, setHouseholds] = useState<Household[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isSyncing, setIsSyncing] = useState(false);

	// Create Household Form State
	const [newHouseholdName, setNewHouseholdName] = useState("");
	const [newHouseholdLanguage, setNewHouseholdLanguage] =
		useState<Language>("en");
	const [newMembers, setNewMembers] = useState<string[]>([""]);

	useEffect(() => {
		const q = collection(db, "households");
		const unsubscribe = onSnapshot(
			q,
			{ includeMetadataChanges: true },
			(snapshot) => {
				try {
					const loadedHouseholds: Household[] = [];
					snapshot.forEach((doc) => {
						const data = doc.data() as Omit<Household, "id">;
						loadedHouseholds.push({ id: doc.id, ...data });
					});
					setHouseholds(loadedHouseholds);

					// Auto-select if saved in local storage
					const savedId = localStorage.getItem(LOCAL_STORAGE_KEY);
					if (savedId) {
						const found = loadedHouseholds.find(
							(h) => h.id === savedId,
						);
						if (found) {
							onSelectHousehold(found);
						}
					}

					setLoading(false);
					setIsSyncing(snapshot.metadata.fromCache);
					setError(null);
				} catch (error) {
					console.error("Error loading households:", error);
					setError(
						"Unable to connect to Firebase. This is often caused by an ad blocker or browser extension. Please try disabling them.",
					);
					setLoading(false);
				}
			},
		);

		return () => unsubscribe();
	}, [db, onSelectHousehold]);

	const handleCreateHousehold = async () => {
		if (!newHouseholdName.trim())
			return alert("Please enter a household name");
		const validMembers = newMembers
			.filter((m) => m.trim())
			.map((name) => ({
				color: "red" as AccentColor,
				emoji: "👤",
				id: name.toLowerCase().replace(/\s+/g, "-"),
				name,
			}));

		if (validMembers.length === 0)
			return alert("Please add at least one member");

		const newHousehold: Omit<Household, "id"> = {
			chores: DEFAULT_CHORES,
			currency: "EUR",
			language: newHouseholdLanguage,
			members: validMembers,
			name: newHouseholdName,
		};

		try {
			const docRef = await addDoc(
				collection(db, "households"),
				newHousehold,
			);
			const created = { id: docRef.id, ...newHousehold };

			// Create initial period
			await addDoc(collection(db, "households", docRef.id, "periods"), {
				createdAt: new Date(),
				endDate: null,
				startDate: new Date(),
			});

			onSelectHousehold(created);
		} catch (error) {
			console.error("Error creating household:", error);
			alert("Failed to create household");
		}
	};

	if (loading) return <PageContainer>Loading...</PageContainer>;

	if (error) {
		return (
			<>
				<PageHeader
					title={"Connection Error"}
					slotMain={
						<Subtitle style={{ color: "#e74c3c" }}>
							{error}
						</Subtitle>
					}
				/>
			</>
		);
	}

	if (view === "create") {
		return (
			<>
				<PageHeader title={"New Household"} />
				<PageContainer>
					{/* <Header>
          <BackButton onClick={() => setView("list")}>
            <ArrowLeft size={24} />
          </BackButton>
          <PageHeadline>New Household</PageHeadline>
        </Header> */}
					<FormGroup>
						<Label>Household Name</Label>
						<Input
							placeholder="e.g. The Smiths"
							value={newHouseholdName}
							onChange={(e) =>
								setNewHouseholdName(e.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Language</Label>
						<Select
							value={newHouseholdLanguage}
							onChange={(e) =>
								setNewHouseholdLanguage(
									e.target.value as Language,
								)
							}
							options={SUPPORTED_LANGUAGES}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Members</Label>
						{newMembers.map((member, index) => (
							<div
								key={index}
								style={{
									display: "flex",
									gap: "0.5rem",
									marginBottom: "0.5rem",
								}}
							>
								<Input
									placeholder="Name"
									value={member}
									onChange={(e) => {
										const updated = [...newMembers];
										updated[index] = e.target.value;
										setNewMembers(updated);
									}}
									style={{ marginBottom: 0 }}
								/>
								{newMembers.length > 1 && (
									<IconButton
										onClick={() =>
											setNewMembers(
												newMembers.filter(
													(_, i) => i !== index,
												),
											)
										}
										style={{
											color: "#e74c3c",
											position: "static",
										}}
									>
										<Trash2 size={20} />
									</IconButton>
								)}
							</div>
						))}
						<Button
							onClick={() => setNewMembers([...newMembers, ""])}
							startIcon={<Plus size={18} aria-hidden="true" />}
						>
							Add Member
						</Button>
					</FormGroup>
					<Button
						onClick={handleCreateHousehold}
						style={{ marginTop: "2rem" }}
					>
						Create Household
					</Button>
				</PageContainer>
			</>
		);
	}

	return (
		<>
			<PageHeader
				title={"Payday Pal"}
				slotMain={
					<Subtitle>
						Manage chores, track allowances, and teach financial
						responsibility.
					</Subtitle>
				}
			/>
			<PageContainer>
				{/* <Header> */}
				{isSyncing && (
					<LoadingIndicator>
						<Loader size={20} />
					</LoadingIndicator>
				)}
				{/* <PageHeadline>The Pay-Day Pal</PageHeadline> */}
				{/* </Header> */}

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: "3rem",
					}}
				>
					<Button
						onClick={() => setView("create")}
						startIcon={<Plus size={18} aria-hidden="true" />}
					>
						Create New Household
					</Button>
				</div>

				{households.length > 0 && (
					<div style={{ margin: "0 auto", maxWidth: "600px" }}>
						{households.map((h) => (
							<Card
								key={h.id}
								onClick={() => onSelectHousehold(h)}
							>
								<CardTitle>{h.name}</CardTitle>
								<CardMeta>
									<Users size={16} /> {h.members.length}{" "}
									Members
								</CardMeta>
							</Card>
						))}
					</div>
				)}
			</PageContainer>
		</>
	);
}
