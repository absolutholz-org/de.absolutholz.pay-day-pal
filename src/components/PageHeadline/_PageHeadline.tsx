import * as S from "./_PageHeadline.styles";
import { PageHeadlineProps } from "./_PageHeadline.types";

export function PageHeadline({ children }: PageHeadlineProps) {
	return <S.PageHeadline>{children}</S.PageHeadline>;
}
