import { useData } from "../../context/DataContext";
import { useLocalization } from "../../context/LocalizationContext";

export function NoActivePeriodView() {
	const { finishPeriod } = useData();
	const { t } = useLocalization();

	return (
		<div
			style={{
				alignItems: "center",
				color: "#7f8c8d",
				display: "flex",
				flex: 1,
				flexDirection: "column",
				gap: "1rem",
				justifyContent: "center",
				padding: "2rem",
			}}
		>
			<p style={{ fontSize: "1.2rem" }}>{t.noActivePeriod}</p>
			<p>{t.startNewPeriodDescription}</p>

			<button
				onClick={() => finishPeriod(true)}
				style={{
					backgroundColor: "#3498db",
					border: "none",
					borderRadius: "5px",
					boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
					color: "white",
					cursor: "pointer",
					fontSize: "16px",
					padding: "10px 20px",
				}}
			>
				{t.startNewPeriodButton}
			</button>
		</div>
	);
}
