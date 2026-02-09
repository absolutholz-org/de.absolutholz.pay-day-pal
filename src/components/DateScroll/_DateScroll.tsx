import { formatDateKey } from "../../utils";
import { DateCard } from "../DateCard";
import * as S from "./_DateScroll.styles";
import { type DateScrollProps } from "./_DateScroll.types";

export function DateScroll({
	dates,
	getDailyTotal,
	onDateSelect,
	selectedDate,
}: DateScrollProps) {
	const todayKey = formatDateKey(new Date());

	return (
		<S.DateScroll_Container>
			<S.DateScroll role="list">
				{dates.map((date) => {
					const dateKey = formatDateKey(date);
					const isActive = selectedDate === dateKey;
					const isToday = dateKey === todayKey;
					const dailyTotal = getDailyTotal(date);

					return (
						<S.DateScroll_ListItem key={dateKey}>
							<DateCard
								date={date}
								isActive={isActive}
								isToday={isToday}
								dailyTotal={dailyTotal}
								onClick={() => onDateSelect(dateKey)}
							/>
						</S.DateScroll_ListItem>
					);
				})}
			</S.DateScroll>
		</S.DateScroll_Container>
	);
}
