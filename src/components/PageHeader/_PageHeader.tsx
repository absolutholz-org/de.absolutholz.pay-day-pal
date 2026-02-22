import * as S from "./_PageHeader.styles";
import { type PageHeaderProps } from "./_PageHeader.types";

export function PageHeader({
	slotLead,
	slotMain,
	slotTrail,
	title,
}: PageHeaderProps) {
	return (
		<S.PageHeader>
			<S.PageHeader_Column_Main>
				{slotLead && (
					<S.PageHeader_Column_Lead>
						{slotLead}
					</S.PageHeader_Column_Lead>
				)}
				<S.PageHeader_MainHeadline>{title}</S.PageHeader_MainHeadline>
				{slotTrail && (
					<S.PageHeader_Column_Trail>
						{slotTrail}
					</S.PageHeader_Column_Trail>
				)}
			</S.PageHeader_Column_Main>
			{slotMain && (
				<S.PageHeader_MainAdditional>
					{slotMain}
				</S.PageHeader_MainAdditional>
			)}
		</S.PageHeader>
	);
}
