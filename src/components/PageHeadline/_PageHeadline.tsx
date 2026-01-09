import { PageHeadlineProps } from "./_PageHeadline.types";

import * as S from "./_PageHeadline.styles";

export function PageHeadline({ children }: PageHeadlineProps) {
  return <S.PageHeadline>{children}</S.PageHeadline>;
}
