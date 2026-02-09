import * as S from "./_PageSection.styles";
import { type PageSectionProps } from "./_PageSection.types";

export function PageSection({ children, headline }: PageSectionProps) {
	return (
		<S.PageSection>
			{headline && (
				<S.PageSection_Headline>{headline}</S.PageSection_Headline>
			)}
			{children}
		</S.PageSection>
	);
}
