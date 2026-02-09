import type { ButtonProps } from "./_Button.styles";
import * as S from "./_Button.styles";

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
	label,
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
