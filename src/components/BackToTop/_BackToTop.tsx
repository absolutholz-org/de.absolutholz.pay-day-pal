import { ArrowUp } from "lucide-react";

import * as S from "./_BackToTop.styles";
import { BackToTopProps } from "./_BackToTop.types";

export const BackToTop = ({ label = "Back to top" }: BackToTopProps) => {
  return (
    <S.BackToTop>
      <S.BackToTop_Anchor href="#top" aria-label={label}>
        <ArrowUp size={24} />
      </S.BackToTop_Anchor>
    </S.BackToTop>
  );
};
