import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/Button";
import { FrostedGlassSection } from "../components/FrostedGlassSection";
import {
	HistoryItem,
	HistoryItem_Content,
	HistoryItem_Icon,
	HistoryItem_Title,
} from "../components/HistoryItem/_HistoryItem.styles";
import { HistoryItemList } from "../components/HistoryItemList";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageSection } from "../components/PageSection";
import { useData } from "../context/DataContext";
import { useLocalization } from "../context/LocalizationContext";
import { Subtitle } from "../globalStyles";
import { useDateFormatter } from "../hooks/useDateFormatter";
import { type Period } from "../types";

export default function PeriodSelectionScreen() {
	const { getPastPeriods } = useData();
	const { t } = useLocalization();
	const [periods, setPeriods] = useState<Period[]>([]);
	const [loading, setLoading] = useState(true);
	const dateFormatter = useDateFormatter();

	useEffect(() => {
		getPastPeriods().then((data) => {
			setPeriods(data);
			console.log({ data });
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
				<PageSection headline={t.selectPeriod}>
					{loading ? (
						<Subtitle>Loading...</Subtitle>
					) : periods.length === 0 ? (
						<Subtitle>No past periods found.</Subtitle>
					) : (
						<FrostedGlassSection>
							<HistoryItemList>
								{periods.map(({ endDate, id, startDate }) => {
									const start = new Date(startDate);
									const end = endDate
										? new Date(endDate)
										: null;
									return (
										<Link
											key={id}
											to={`/history/${id}`}
											style={{
												color: "inherit",
												display: "block",
												textDecoration: "none",
											}}
										>
											<HistoryItem>
												<HistoryItem_Icon>
													📅
												</HistoryItem_Icon>
												<HistoryItem_Content>
													<HistoryItem_Title>
														<time
															dateTime={start.toISOString()}
														>
															<span aria-hidden="true"></span>{" "}
															{dateFormatter.format(
																start,
															)}
														</time>{" "}
														-{" "}
														{!end ? (
															"now"
														) : (
															<time
																dateTime={end.toISOString()}
															>
																<span aria-hidden="true"></span>{" "}
																{dateFormatter.format(
																	end,
																)}
															</time>
														)}
													</HistoryItem_Title>
												</HistoryItem_Content>
											</HistoryItem>
										</Link>
									);
								})}
							</HistoryItemList>
						</FrostedGlassSection>
					)}
				</PageSection>
			</PageContainer>
		</>
	);
}
