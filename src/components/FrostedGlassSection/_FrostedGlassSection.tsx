import * as S from "./_FrostedGlassSection.styles";
import type { FrostedGlassSectionProps } from "./_FrostedGlassSection.types";

export function FrostedGlassSection({
	headline,
	children,
}: FrostedGlassSectionProps) {
	return (
		<S.FrostedGlassSection>
			{headline && (
				<S.FrostedGlassSection_Headline>
					{headline}
				</S.FrostedGlassSection_Headline>
			)}
			{children}
		</S.FrostedGlassSection>
	);
}
