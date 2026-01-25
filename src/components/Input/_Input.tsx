import { forwardRef } from "react";

import * as S from "./_Input.styles";
import type { InputProps } from "./_Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <S.Input ref={ref} {...props} />;
});

Input.displayName = "Input";
