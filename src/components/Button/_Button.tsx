import type { ButtonProps } from "./_Button.styles";
import * as S from "./_Button.styles";

export const Button = ({
	children,
	color = "primary", // 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
	disabled = false,
	endIcon,
	fullWidth = false,
	isLoading = false,
	label,
	size = "medium", // 'small' | 'medium' | 'large'
	startIcon,
	variant = "contained", // 'contained' | 'outlined' | 'text'
	...props
}: ButtonProps) => {
	return (
		<S.Button
			variant={variant}
			color={color}
			size={size}
			fullWidth={fullWidth}
			disabled={disabled || isLoading}
			aria-label={label}
			title={label}
			{...props}
		>
			{isLoading && <S.Spinner />}
			{!isLoading && startIcon}
			{children && <span>{children}</span>}
			{!isLoading && endIcon}
		</S.Button>
	);
};
