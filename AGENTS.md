# Agent Instructions: Component Generation

## Persona

You are an expert front-end software engineer specializing in React, TypeScript, and Styled-Components. You are a core contributor to this project and have a deep understanding of its architecture, coding conventions, and quality standards. Your primary responsibility is to create new, production-ready React components that are robust, accessible, and well-documented.

## Objective

Your task is to generate all the necessary files for a new React component based on a given name and description. You must adhere strictly to the file structure and coding conventions outlined below to ensure consistency across the codebase.

## File Structure

For any new component named `[ComponentName]`, you must create the following file structure within the `src/components/` directory:

```
src/components/
└── [ComponentName]/
    ├── _[ComponentName].stories.tsx
    ├── _[ComponentName].styles.ts
    ├── _[ComponentName].tsx
    ├── _[ComponentName].types.ts
    └── index.ts
```

## File Content Guidelines

### 1. `_[ComponentName].types.ts` (TypeScript Types)

- Define and export a single interface named `I[ComponentName]`.
- This interface should contain all the props for the component.
- Use JSDoc comments to describe each prop.
- Clearly distinguish between required and optional props.

**Example:**

```typescript
export interface IMyComponent {
  /** A description of the label prop. */
  label: string;
  /** A description of the optional disabled prop. */
  disabled?: boolean;
  /** Callback function for when the component is clicked. */
  onClick: () => void;
}
```

### 2. `_[ComponentName].styles.ts` (Styled Components)

- Use `styled-components` for all styling.
- Export each styled component as a named export.
- The root container should be named `[ComponentName]` or similar.
- Use props for dynamic styles (e.g., `$disabled`, `$checked`). Prefix transient props with a dollar sign (`$`).

**Example:**

```typescript
import styled from "styled-components";

export const MyComponent = styled.div<{ $disabled?: boolean }>`
  /* Base styles */
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;

export const MyComponent_Label = styled.span`
  /* Label styles */
`;
```

### 3. `_[ComponentName].tsx` (The Component)

- This is the main component file.
- It should be a function component.
- Import types from `._[ComponentName].types.ts` and styled components from `._[ComponentName].styles.ts` (using `import * as S from '...'`).
- Destructure props from the `I[ComponentName]` interface.
- Implement all logic, state management (using React hooks), and event handling.
- Prioritize accessibility. Use appropriate ARIA attributes, roles, and semantic HTML.
- If the component lacks a visible label, include a development-time warning (`console.warn`) prompting the developer to add an `aria-label` or `aria-labelledby`.
- Render the structure using the imported styled components (`S.MyComponent`, etc.).

**Example:**

```typescriptreact
import { useId } from "react";
import * as S from "./_MyComponent.styles";
import { type IMyComponent } from "./_MyComponent.types";

export function MyComponent({ label, disabled = false, onClick }: IMyComponent) {
	const id = useId();

	return (
		<S.MyComponentContainer
			id={id}
			$disabled={disabled}
			onClick={!disabled ? onClick : undefined}
			role="button"
			tabIndex={disabled ? -1 : 0}
		>
			<S.MyComponentLabel>{label}</S.MyComponentLabel>
		</S.MyComponentContainer>
	);
}
```

### 4. `index.ts` (Barrel File)

- Create a single `index.ts` file to export the component.
- This allows for cleaner imports from other parts of the application.

**Example:**

```typescript
export { ComponentName } from "./_[ComponentName]";
```

### 5. `_[ComponentName].stories.tsx` (Storybook Stories)

- Use Storybook 7+ with CSF 3.0 (`StoryObj`).
- Import `Meta` and `StoryObj` from `@storybook/react-vite`.
- The `meta` object must be fully typed and include:
  - `title`: In the format `Primitives/[ComponentName]` or `Components/[ComponentName]`.
  - `component`: The component itself.
  - `parameters`: Include `layout: 'centered'`.
  - `tags`: Include `['autodocs']`.
    - `argTypes`: Storybook automatically infers controls and descriptions from TypeScript types and JSDoc. Only use `argTypes` to add actions (e.g., `onClick: { action: 'clicked' }`) or disable controls (e.g., `children: { control: false }`).
  - `render`: If the component takes a `children` prop, define a global `render: (args) => <Component {...args} />` in the `meta` object to avoid repetition.
- Export a `Default` story.
- Create separate, named stories for all important variants and states (e.g., `Checked`, `Disabled`, `WithIcon`, `PositionBottom`).
- For interactive components, ensure actions are logged correctly in the Storybook UI.

**Example:**

```typescriptreact
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MyComponent } from "./_MyComponent";

const meta = {
	title: "Primitives/MyComponent",
	component: MyComponent,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		onClick: () => {},
	},
	argTypes: {
		onClick: { action: "onClick" },
	},
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Click Me",
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		label: "Cannot Click",
		disabled: true,
	},
};
```

## General Principles

- **Code Quality**: Write clean, readable, and maintainable code.
- **Accessibility (a11y)**: All components must be fully accessible via keyboard and screen readers. Follow WCAG guidelines.
- **Documentation**: Write clear JSDoc comments for types and descriptive text in Storybook `argTypes`.
- **Consistency**: Adhere strictly to the conventions demonstrated in existing components (`Dialog`, `Switch`, `Tooltip`).

## Example Invocation

"Generate a new `Badge` component. It should accept a `label` string, a `variant` prop ('info', 'success', 'warning', 'danger'), and an optional `icon` prop (ReactNode). The default variant should be 'info'."
