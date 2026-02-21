import { BalanceDisplay } from "../../components/BalanceDisplay";
import { ChoreCardList } from "../../components/ChoreCardList";
import { DateScroll } from "../../components/DateScroll";
import { HouseholdMemberSelector } from "../../components/HouseholdMemberSelector";
import { PageContainer } from "../../components/PageContainer";
import { useLocalization } from "../../context/LocalizationContext";
import { type ChoreData, type Household } from "../../types";

interface ActivePeriodViewProps {
	members: Household["members"];
	activeChild: string;
	setActiveChild: (id: string) => void;
	totalBalance: number;
	periodDates: Date[];
	selectedDate: string;
	setSelectedDate: (date: string) => void;
	getDailyTotal: (date: Date) => number;
	chores: Household["chores"];
	choreData: ChoreData;
}

export function ActivePeriodView({
	activeChild,
	choreData,
	chores,
	getDailyTotal,
	members,
	periodDates,
	selectedDate,
	setActiveChild,
	setSelectedDate,
	totalBalance,
}: ActivePeriodViewProps) {
	const { language } = useLocalization();

	return (
		<>
			<PageContainer>
				<HouseholdMemberSelector
					members={members}
					activeMemberId={activeChild}
					onSelectMember={setActiveChild}
				/>

				<BalanceDisplay total={totalBalance} />
			</PageContainer>

			<DateScroll
				dates={periodDates}
				selectedDate={selectedDate}
				onDateSelect={setSelectedDate}
				getDailyTotal={getDailyTotal}
			/>

			<PageContainer>
				<ChoreCardList
					chores={chores}
					counts={choreData}
					currentActivityDate={selectedDate}
					currentMemberId={activeChild}
					language={language}
				/>
			</PageContainer>
		</>
	);
}
