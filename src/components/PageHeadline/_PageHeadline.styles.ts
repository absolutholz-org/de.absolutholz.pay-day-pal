import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { colorSchemeCss } from "../../_colorSchemeCss";

export const PageHeadline = styled.h1`
	background-clip: text;
	${colorSchemeCss({
		darkCssVars: css`
			background-image: linear-gradient(
				to right,
				oklch(0.714 0.203 305.504) 0%,
				oklch(0.718 0.202 349.761) 100%
			);
		`,
		lightCssVars: css`
			background-image: linear-gradient(
				to right,
				oklch(0.558 0.288 302.321) 0%,
				oklch(0.592 0.249 0.584) 100%
			);
		`,
	})}
	color: transparent;
	font-size: 1.875rem;
	font-weight: 700;
	line-height: 1.2;
	margin-block: 0;
`;
