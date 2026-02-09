import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { CHORE_CATEGORIES } from "../../constants/constants";
import { useData } from "../../context/DataContext";
import { useCurrency } from "../../hooks/useCurrency";
import { useLocalization } from "../../context/LocalizationContext";
import * as S from "./_ChoreCard.styles";
import { ConfettiBurst } from "../ConfettiBurst";

export interface ChoreCardProps {
	id: string;
	label: string;
	category: keyof typeof CHORE_CATEGORIES;
	count: number;
	value: number;
	currentMemberId: string;
	currentActivityDate: string;
}

export function ChoreCard({
	id,
	label,
	category,
	count,
	value,
	currentMemberId,
	currentActivityDate,
}: ChoreCardProps) {
	const { addActivityRecord, removeActivityRecord } = useData();
	const { t } = useLocalization();
	const [optimisticCount, setOptimisticCount] = useState(count);
	const [showConfetti, setShowConfetti] = useState(false);

	const color = CHORE_CATEGORIES[category].color;
	const formattedValue = useCurrency(value, "en-DE", "EUR");
	const icon = CHORE_CATEGORIES[category].emoji;

	useEffect(() => {
		setOptimisticCount(count);
	}, [count]);

	const handleUpdate = async (change: number) => {
		const newCount = Math.max(0, optimisticCount + change);
		if (newCount === optimisticCount) return;

		if (typeof navigator !== "undefined" && navigator.vibrate) {
			navigator.vibrate(10);
		}

		setOptimisticCount(newCount); // Optimistic update

		try {
			if (change > 0) {
				setShowConfetti(true);
				await addActivityRecord(
					currentMemberId,
					id,
					currentActivityDate,
				);
				setTimeout(() => setShowConfetti(false), 50);
			} else {
				await removeActivityRecord(
					currentMemberId,
					id,
					currentActivityDate,
				);
			}
		} catch (error) {
			console.error("Error updating chore:", error);
			setOptimisticCount(count); // Revert on error
		}
	};

	return (
		<S.ChoreCard
			role="group"
			aria-labelledby={id}
			data-count={optimisticCount > 0 ? optimisticCount : undefined}
			style={{
				"--chore-color": `var(--accent-${color})`,
			}}
		>
			<S.ChoreCard_Top>
				{/* The Icon */}
				<S.ChoreCard_TopImage>
					<S.ChoreCard_TopImage_Bubbles>
						<S.ChoreCard_TopImage_Bubble1 />
						<S.ChoreCard_TopImage_Bubble2 />
					</S.ChoreCard_TopImage_Bubbles>
					<S.ChoreCard_TopIcon>{icon}</S.ChoreCard_TopIcon>
				</S.ChoreCard_TopImage>

				{/* The Reward Badge */}
				<S.ChoreCard_TopPill>{formattedValue}</S.ChoreCard_TopPill>
			</S.ChoreCard_Top>

			{/* Bottom Section: Title and Controls */}
			<S.ChoreCard_Bottom>
				<S.ChoreCard_Title id={id}>{label}</S.ChoreCard_Title>

				<S.ChoreCard_Stepper>
					{/* Minus Button */}
					<S.ChoreCard_StepperButton_Decrement
						onClick={() => handleUpdate(-1)}
						disabled={optimisticCount === 0}
						aria-label={t.decrease}
						title={t.decrease}
					>
						<Minus aria-hidden="true" />
					</S.ChoreCard_StepperButton_Decrement>

					{/* Current Count */}
					<S.ChoreCard_StepperValue>
						{optimisticCount}
					</S.ChoreCard_StepperValue>

					{/* Plus Button */}
					<S.ChoreCard_StepperButton_Increment
						onClick={() => handleUpdate(1)}
						aria-label={t.increase}
						title={t.increase}
					>
						<Plus aria-hidden="true" />
					</S.ChoreCard_StepperButton_Increment>
				</S.ChoreCard_Stepper>
			</S.ChoreCard_Bottom>
			<ConfettiBurst trigger={showConfetti} />
		</S.ChoreCard>
	);
}
