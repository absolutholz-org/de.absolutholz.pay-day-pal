import * as S from "./_Button.styles";
import type { ButtonProps } from "./_Button.styles";

export const Button = ({
  children,
  variant = "contained", // 'contained' | 'outlined' | 'text'
  color = "primary", // 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  size = "medium", // 'small' | 'medium' | 'large'
  startIcon,
  endIcon,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <S.Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <S.Spinner />}
      {!isLoading && startIcon}
      <span>{children}</span>
      {!isLoading && endIcon}
    </S.Button>
  );
};
