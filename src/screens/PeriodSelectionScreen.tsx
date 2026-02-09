import { ArrowLeft, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/Button";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../context/DataContext";
import { useLocalization } from "../context/LocalizationContext";
import { Card, CardMeta, CardTitle, Subtitle } from "../globalStyles";
import { type Period } from "../types";
import { formatDate } from "../utils";

export default function PeriodSelectionScreen() {
	const { getPastPeriods } = useData();
	const { t } = useLocalization();
	const [periods, setPeriods] = useState<Period[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPastPeriods().then((data) => {
			setPeriods(data);
			setLoading(false);
		});
	}, [getPastPeriods]);

	return (
		<>
			<PageHeader
				title="History"
				slotLead={
					<Button
						as={Link}
						to="/settings"
						variant="text"
						label={t.backToSettings}
						startIcon={<ArrowLeft size={24} aria-hidden="true" />}
					/>
				}
			/>
			<PageContainer>
				<Subtitle>Select a Period</Subtitle>
				{loading ? (
					<Subtitle>Loading...</Subtitle>
				) : periods.length === 0 ? (
					<Subtitle>No past periods found.</Subtitle>
				) : (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
						}}
					>
						{periods.map((period) => (
							<Link
								key={period.id}
								to={`/history/${period.id}`}
								style={{
									color: "inherit",
									textDecoration: "none",
								}}
							>
								<Card style={{ cursor: "pointer" }}>
									<CardTitle>
										{formatDate(new Date(period.startDate))}{" "}
										-{" "}
										{period.endDate
											? formatDate(
													new Date(period.endDate),
												)
											: "Now"}
									</CardTitle>
									<CardMeta>
										<Calendar size={16} />
										Ended:{" "}
										{period.endDate
											? formatDate(
													new Date(period.endDate),
												)
											: "Active"}
									</CardMeta>
								</Card>
							</Link>
						))}
					</div>
				)}
			</PageContainer>
		</>
	);
}
