import { PageContainer } from "../PageContainer";
import * as S from "./_PageHeader.styles";
import { PageHeaderProps } from "./_PageHeader.types";

export function PageHeader({
	title,
	slotLead,
	slotMain,
	slotTrail,
}: PageHeaderProps) {
	return (
		<S.PageHeader>
			<PageContainer>
				{slotLead && (
					<S.PageHeader_Column_Lead>
						{slotLead}
					</S.PageHeader_Column_Lead>
				)}
				<S.PageHeader_Column_Main>
					<S.PageHeader_MainHeadline>
						{title}
					</S.PageHeader_MainHeadline>
					{slotMain && (
						<S.PageHeader_MainAdditional>
							{slotMain}
						</S.PageHeader_MainAdditional>
					)}
				</S.PageHeader_Column_Main>
				{slotTrail && (
					<S.PageHeader_Column_Trail>
						{slotTrail}
					</S.PageHeader_Column_Trail>
				)}
			</PageContainer>
		</S.PageHeader>
	);
}
