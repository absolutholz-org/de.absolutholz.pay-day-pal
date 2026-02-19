import { useChore } from "../../hooks/useChore";
import { useMember } from "../../hooks/useMember";
import { HistoryItem } from "../HistoryItem";
import { type IHistoryItemWithMember } from "./_HistoryItemWithMember.types";

export function HistoryItemWithMember({
	amountEarned,
	choreId,
	date,
	memberId,
}: IHistoryItemWithMember) {
	const chore = useChore(choreId);
	const member = useMember(memberId);

	return (
		<HistoryItem
			amountEarned={amountEarned}
			date={date}
			icon={chore?.emoji || "❓"}
			member={member}
			title={chore?.label || "unknown chore"}
		/>
	);
}
