import { ArrowUp } from "lucide-react";

import * as S from "./_BackToTop.styles";
import { BackToTopProps } from "./_BackToTop.types";

export const BackToTop = ({ label }: BackToTopProps) => {
	return (
		<S.BackToTop>
			<S.BackToTop_Anchor
				as="a"
				color="secondary"
				href="#top"
				aria-label={label}
				title={label}
				startIcon={<ArrowUp size={24} aria-hidden />}
			/>
		</S.BackToTop>
	);
};
