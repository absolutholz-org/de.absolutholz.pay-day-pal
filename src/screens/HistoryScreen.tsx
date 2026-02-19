import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { FrostedGlassSection } from "../components/FrostedGlassSection";
import {
	HistoryGroup_ByDay,
	HistoryGroup_ByMember,
} from "../components/HistoryGroup";
import { HistoryItemList } from "../components/HistoryItemList";
import { HistoryItemWithMember } from "../components/HistoryItemWithMember";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../context/DataContext";
import { useLocalization } from "../context/LocalizationContext";
import { Subtitle } from "../globalStyles";
import { type ActivityRecord, type Period } from "../types";
import { formatDate } from "../utils";

type GroupBy = "none" | "date" | "member" | "activity";

export default function HistoryScreen() {
	const { periodId } = useParams<{ periodId: string }>();
	const { currentHousehold, getPeriodActivities } = useData();
	const { t } = useLocalization();
	const [activities, setActivities] = useState<ActivityRecord[]>([]);
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

		const groups = new Map<string, ActivityRecord[]>();

		displayActivities.forEach((activity) => {
			let key = "";
			switch (groupBy) {
				case "date":
					key = formatDate(new Date(activity.date));
					break;
				case "member":
					key = activity.memberId;
					break;
				// case "activity":
				// 	key = activity.choreId;
				// 	break;
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
	console.log({ groupedActivities });

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
					{(["none", "date", "member" /*, "activity"*/] as const).map(
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
					<>
						{groupedActivities.map((group, idg) =>
							groupBy === "date" ? (
								<HistoryGroup_ByDay
									key={idg}
									date={group.key}
									activities={group.items}
								/>
							) : (
								<HistoryGroup_ByMember
									key={idg}
									memberId={group.key}
									activities={group.items}
								/>
							),
						)}
					</>
				) : (
					<FrostedGlassSection>
						<HistoryItemList>
							{displayActivities.map(
								({ choreId, date, id, memberId, value }) => (
									<HistoryItemWithMember
										key={id}
										date={date}
										amountEarned={value}
										choreId={choreId}
										memberId={memberId}
									/>
								),
							)}
						</HistoryItemList>
					</FrostedGlassSection>
				)}
			</PageContainer>
		</>
	);
}
