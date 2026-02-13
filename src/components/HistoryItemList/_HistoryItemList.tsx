import * as S from "./_HistoryItemList.styles";
import { type IHistoryItemList } from "./_HistoryItemList.types";

export function HistoryItemList({ children }: IHistoryItemList) {
	return <S.HistoryItemList>{children}</S.HistoryItemList>;
}
