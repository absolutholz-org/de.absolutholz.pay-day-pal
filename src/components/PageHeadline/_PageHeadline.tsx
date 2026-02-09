import * as S from "./_PageHeadline.styles";
import { type PageHeadlineProps } from "./_PageHeadline.types";

export function PageHeadline({ children }: PageHeadlineProps) {
	return <S.PageHeadline>{children}</S.PageHeadline>;
}
