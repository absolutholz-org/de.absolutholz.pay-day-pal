import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	parameters: {
		layout: "fullscreen",
	},
	title: "Design System/Tokens",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
	render: () => (
		<div
			style={{
				backgroundColor: "var(--sys-color-background)",
				color: "var(--sys-color-on-background)",
				fontFamily: "var(--font-stack)",
				minHeight: "100vh",
				padding: "2rem",
			}}
		>
			<h1
				style={{
					fontSize: "var(--sys-font-size-3xl)",
					marginBottom: "2rem",
				}}
			>
				Design System Tokens
			</h1>

			{/* Colors Section */}
			<section style={{ marginBottom: "3rem" }}>
				<h2
					style={{
						borderBottom: "1px solid var(--sys-color-border)",
						fontSize: "var(--sys-font-size-2xl)",
						marginBottom: "1rem",
						paddingBottom: "0.5rem",
					}}
				>
					System Colors
				</h2>
				<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
					{[
						{ label: "Primary", var: "--sys-color-primary" },
						{
							label: "Primary Hover",
							var: "--sys-color-primary-hover",
						},
						{
							bg: "var(--sys-color-primary)",
							label: "On Primary",
							var: "--sys-color-on-primary",
						},
						{
							label: "Background",
							outline: true,
							var: "--sys-color-background",
						},
						{
							label: "On Background",
							outline: true,
							var: "--sys-color-on-background",
						},
						{
							label: "Surface",
							outline: true,
							var: "--sys-color-surface",
						},
						{ label: "On Surface", var: "--sys-color-on-surface" },
						{ label: "Border", var: "--sys-color-border" },
					].map((token) => (
						<div
							key={token.var}
							style={{
								alignItems: "center",
								display: "flex",
								flexDirection: "column",
								width: "120px",
							}}
						>
							<div
								style={{
									alignItems: "center",
									backgroundColor: `var(${token.var})`,
									border: token.outline
										? "1px solid var(--sys-color-border)"
										: "none",
									borderRadius: "var(--sys-radius-md)",
									color: token.bg
										? "inherit"
										: "var(--sys-color-on-surface)",
									display: "flex",
									height: "80px",
									justifyContent: "center",
									marginBottom: "0.5rem",
									width: "80px",
								}}
							></div>
							<span
								style={{
									fontSize: "var(--sys-font-size-xs)",
									textAlign: "center",
								}}
							>
								{token.label}
								<br />
								<code>{token.var}</code>
							</span>
						</div>
					))}
				</div>
			</section>

			{/* Typography Section */}
			<section style={{ marginBottom: "3rem" }}>
				<h2
					style={{
						borderBottom: "1px solid var(--sys-color-border)",
						fontSize: "var(--sys-font-size-2xl)",
						marginBottom: "1rem",
						paddingBottom: "0.5rem",
					}}
				>
					Typography (Font Sizes)
				</h2>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					{[
						{ size: "3xl", var: "--sys-font-size-3xl" },
						{ size: "2xl", var: "--sys-font-size-2xl" },
						{ size: "xl", var: "--sys-font-size-xl" },
						{ size: "lg", var: "--sys-font-size-lg" },
						{ size: "base", var: "--sys-font-size-base" },
						{ size: "sm", var: "--sys-font-size-sm" },
						{ size: "xs", var: "--sys-font-size-xs" },
					].map((token) => (
						<div
							key={token.var}
							style={{
								alignItems: "center",
								display: "grid",
								gridTemplateColumns: "150px 1fr",
							}}
						>
							<code
								style={{ fontSize: "var(--sys-font-size-sm)" }}
							>
								{token.var}
							</code>
							<div
								style={{
									fontSize: `var(${token.var})`,
									lineHeight: 1,
								}}
							>
								The quick brown fox jumps over the lazy dog (
								{token.size})
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Spacing Section */}
			<section style={{ marginBottom: "3rem" }}>
				<h2
					style={{
						borderBottom: "1px solid var(--sys-color-border)",
						fontSize: "var(--sys-font-size-2xl)",
						marginBottom: "1rem",
						paddingBottom: "0.5rem",
					}}
				>
					Spacing
				</h2>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					{[
						{ var: "--sys-spacing-2xl" },
						{ var: "--sys-spacing-xl" },
						{ var: "--sys-spacing-lg" },
						{ var: "--sys-spacing-md" },
						{ var: "--sys-spacing-sm" },
						{ var: "--sys-spacing-xs" },
					].map((token) => (
						<div
							key={token.var}
							style={{
								alignItems: "center",
								display: "grid",
								gridTemplateColumns: "200px 1fr",
							}}
						>
							<code
								style={{ fontSize: "var(--sys-font-size-sm)" }}
							>
								{token.var}
							</code>
							<div
								style={{
									backgroundColor: "var(--sys-color-primary)",
									borderRadius: "var(--sys-radius-sm)",
									height: "24px",
									width: `var(${token.var})`,
								}}
							/>
						</div>
					))}
				</div>
			</section>

			{/* Radii Section */}
			<section style={{ marginBottom: "3rem" }}>
				<h2
					style={{
						borderBottom: "1px solid var(--sys-color-border)",
						fontSize: "var(--sys-font-size-2xl)",
						marginBottom: "1rem",
						paddingBottom: "0.5rem",
					}}
				>
					Border Radii
				</h2>
				<div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
					{[
						{ var: "--sys-radius-sm" },
						{ var: "--sys-radius-md" },
						{ var: "--sys-radius-lg" },
						{ var: "--sys-radius-full" },
					].map((token) => (
						<div
							key={token.var}
							style={{
								alignItems: "center",
								display: "flex",
								flexDirection: "column",
								gap: "0.5rem",
							}}
						>
							<div
								style={{
									backgroundColor: "var(--sys-color-surface)",
									border: "2px solid var(--sys-color-primary)",
									borderRadius: `var(${token.var})`,
									height: "100px",
									width: "100px",
								}}
							/>
							<code
								style={{ fontSize: "var(--sys-font-size-xs)" }}
							>
								{token.var}
							</code>
						</div>
					))}
				</div>
			</section>
		</div>
	),
};
