import { ArrowLeft, ArrowUpDown, Euro } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../context/DataContext";
import { type Activity } from "../context/DataContext/_types";
import { useLocalization } from "../context/LocalizationContext";
import { Card, CardMeta, CardTitle, Subtitle } from "../globalStyles";
import { type Period } from "../types";
import { formatDate } from "../utils";

type GroupBy = "none" | "date" | "member" | "activity";

export default function HistoryScreen() {
	const { periodId } = useParams<{ periodId: string }>();
	const { currentHousehold, getPeriodActivities } = useData();
	const { t } = useLocalization();
	const [activities, setActivities] = useState<Activity[]>([]);
	const [period, setPeriod] = useState<Period | null>(null);
	const [loading, setLoading] = useState(true);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [groupBy, setGroupBy] = useState<GroupBy>("none");
	const [filterMemberId, setFilterMemberId] = useState<string>("all");

	useEffect(() => {
		if (periodId) {
			getPeriodActivities(periodId).then(({ activities, period }) => {
				setPeriod(period);
				setActivities(activities);
				setLoading(false);
			});
		}
	}, [getPeriodActivities, periodId]);

	const displayActivities = useMemo(() => {
		let result = activities;

		if (filterMemberId !== "all") {
			result = result.filter((a) => a.memberId === filterMemberId);
		}
		if (sortOrder === "desc") return result;
		return [...result].reverse();
	}, [activities, sortOrder, filterMemberId]);

	const groupedActivities = useMemo(() => {
		if (groupBy === "none") return null;

		const groups = new Map<string, Activity[]>();

		displayActivities.forEach((activity) => {
			let key = "";
			switch (groupBy) {
				case "date":
					key = formatDate(new Date(activity.date));
					break;
				case "member":
					key = activity.memberName;
					break;
				case "activity":
					key = activity.choreLabel;
					break;
			}

			if (!groups.has(key)) {
				groups.set(key, []);
			}
			groups.get(key)!.push(activity);
		});

		return Array.from(groups.entries()).map(([key, items]) => ({
			items,
			key,
			totalValue: items.reduce((sum, item) => sum + item.value, 0),
		}));
	}, [displayActivities, groupBy]);

	const renderActivityCard = (activity: Activity) => (
		<Card key={activity.id} style={{ cursor: "default" }}>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<CardTitle>{activity.choreLabel}</CardTitle>
				<span
					style={{
						alignItems: "center",
						color: "#2ecc71",
						display: "flex",
						gap: "0.25rem",
					}}
				>
					<Euro size={20} /> {activity.value.toFixed(2)}
				</span>
			</div>
			<CardMeta>
				{formatDate(new Date(activity.date))} • {activity.memberName}
			</CardMeta>
		</Card>
	);

	return (
		<>
			<PageHeader
				title={
					period
						? `${formatDate(new Date(period.startDate))} - ${period.endDate ? formatDate(new Date(period.endDate)) : "Now"}`
						: "History"
				}
				slotLead={
					<Button
						as={Link}
						to="/history"
						variant="text"
						label={t.backToHistory}
						startIcon={<ArrowLeft size={24} aria-hidden="true" />}
					/>
				}
				slotTrail={
					<button
						onClick={() =>
							setSortOrder((prev) =>
								prev === "desc" ? "asc" : "desc",
							)
						}
						style={{
							alignItems: "center",
							background: "none",
							border: "none",
							color: "white",
							cursor: "pointer",
							display: "flex",
						}}
					>
						<ArrowUpDown size={24} />
					</button>
				}
			/>
			<PageContainer>
				<div
					style={{
						alignItems: "center",
						display: "flex",
						gap: "0.5rem",
						marginBottom: "0.5rem",
						overflowX: "auto",
						paddingBottom: "0.5rem",
					}}
				>
					<span
						style={{
							color: "#7f8c8d",
							fontSize: "0.8rem",
							fontWeight: "bold",
							marginRight: "0.25rem",
						}}
					>
						Filter:
					</span>
					<button
						onClick={() => setFilterMemberId("all")}
						style={{
							background:
								filterMemberId === "all"
									? "#3498db"
									: "#ecf0f1",
							border: "none",
							borderRadius: "20px",
							color:
								filterMemberId === "all" ? "white" : "#2c3e50",
							cursor: "pointer",
							fontSize: "0.9rem",
							fontWeight: "600",
							padding: "0.5rem 1rem",
							whiteSpace: "nowrap",
						}}
					>
						All
					</button>
					{currentHousehold?.members.map((member) => (
						<button
							key={member.id}
							onClick={() => setFilterMemberId(member.id)}
							style={{
								background:
									filterMemberId === member.id
										? "#3498db"
										: "#ecf0f1",
								border: "none",
								borderRadius: "20px",
								color:
									filterMemberId === member.id
										? "white"
										: "#2c3e50",
								cursor: "pointer",
								fontSize: "0.9rem",
								fontWeight: "600",
								padding: "0.5rem 1rem",
								whiteSpace: "nowrap",
							}}
						>
							{member.name}
						</button>
					))}
				</div>
				<div
					style={{
						alignItems: "center",
						display: "flex",
						gap: "0.5rem",
						marginBottom: "1rem",
						overflowX: "auto",
						paddingBottom: "0.5rem",
					}}
				>
					<span
						style={{
							color: "#7f8c8d",
							fontSize: "0.8rem",
							fontWeight: "bold",
							marginRight: "0.25rem",
						}}
					>
						Group:
					</span>
					{(["none", "date", "member", "activity"] as const).map(
						(g) => (
							<button
								key={g}
								onClick={() => setGroupBy(g)}
								style={{
									background:
										groupBy === g ? "#3498db" : "#ecf0f1",
									border: "none",
									borderRadius: "20px",
									color: groupBy === g ? "white" : "#2c3e50",
									cursor: "pointer",
									fontSize: "0.9rem",
									fontWeight: "600",
									padding: "0.5rem 1rem",
									textTransform: "capitalize",
									whiteSpace: "nowrap",
								}}
							>
								{g === "none" ? "None" : g}
							</button>
						),
					)}
				</div>

				{loading ? (
					<Subtitle>Loading...</Subtitle>
				) : displayActivities.length === 0 ? (
					<Subtitle>No activities found.</Subtitle>
				) : groupedActivities ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "1.5rem",
						}}
					>
						{groupedActivities.map((group) => (
							<div key={group.key}>
								<h3
									style={{
										alignItems: "center",
										color: "#7f8c8d",
										display: "flex",
										fontSize: "1rem",
										justifyContent: "space-between",
										margin: "0 0 0.5rem 0",
										padding: "0 0.25rem",
									}}
								>
									<span>{group.key}</span>
									<span
										style={{
											alignItems: "center",
											color: "#27ae60",
											display: "flex",
											gap: "0.25rem",
										}}
									>
										<Euro size={14} />{" "}
										{group.totalValue.toFixed(2)}
									</span>
								</h3>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "0.5rem",
									}}
								>
									{group.items.map(renderActivityCard)}
								</div>
							</div>
						))}
					</div>
				) : (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
						}}
					>
						{displayActivities.map(renderActivityCard)}
					</div>
				)}
			</PageContainer>
		</>
	);
}
