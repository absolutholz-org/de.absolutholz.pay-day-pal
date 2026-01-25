import { css, type SerializedStyles } from "@emotion/react";

export function colorSchemeCss({
  lightCssVars,
  darkCssVars,
}: {
  lightCssVars?: SerializedStyles;
  darkCssVars?: SerializedStyles;
}): SerializedStyles {
  return css`
    ${lightCssVars}

    @media (prefers-color-scheme: dark) {
      ${darkCssVars}

      [data-color-scheme="light"] & {
        ${lightCssVars}
      }
    }

    [data-color-scheme="dark"] & {
      ${darkCssVars}
    }
  `;
}
