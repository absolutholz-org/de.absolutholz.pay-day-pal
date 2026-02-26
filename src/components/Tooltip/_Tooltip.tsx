import {
	Children,
	cloneElement,
	useCallback,
	useEffect,
	useId,
	useRef,
} from "react";

import * as S from "./_Tooltip.styles";
import { type ITooltip } from "./_Tooltip.types";

export const Tooltip = ({ children, content, position = "top" }: ITooltip) => {
	const triggerRef = useRef<HTMLElement | null>(null);
	const popoverRef = useRef<HTMLDivElement>(null);
	const hideTimeoutRef = useRef<NodeJS.Timeout>();
	const popoverId = useId();

	// Handle Escape key dismissal (WCAG 1.4.13)
	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") {
			hidePopover(0);
		}
	}, []);

	// Handle scroll dismissal to prevent detached tooltips
	const handleScroll = useCallback(() => {
		hidePopover(0);
	}, []);

	useEffect(() => {
		if (popoverRef.current) {
			popoverRef.current.setAttribute("popover", "manual");
		}
	}, [content]);

	const updatePopoverPosition = () => {
		if (!triggerRef.current || !popoverRef.current) return;
		const triggerRect = triggerRef.current.getBoundingClientRect();
		const popoverRect = popoverRef.current.getBoundingClientRect();

		const gap = 8;
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		// Available space
		const spaceTop = triggerRect.top;
		const spaceBottom = vh - triggerRect.bottom;
		const spaceLeft = triggerRect.left;
		const spaceRight = vw - triggerRect.right;

		const neededV = popoverRect.height + gap;
		const neededH = popoverRect.width + gap;

		// Determine actual position based on preference and available space
		let actualPos = position;
		if (actualPos === "top" && spaceTop < neededV && spaceBottom >= neededV)
			actualPos = "bottom";
		else if (
			actualPos === "bottom" &&
			spaceBottom < neededV &&
			spaceTop >= neededV
		)
			actualPos = "top";
		else if (
			actualPos === "left" &&
			spaceLeft < neededH &&
			spaceRight >= neededH
		)
			actualPos = "right";
		else if (
			actualPos === "right" &&
			spaceRight < neededH &&
			spaceLeft >= neededH
		)
			actualPos = "left";

		let finalTop = 0;
		let finalLeft = 0;

		switch (actualPos) {
			case "top":
				finalTop = triggerRect.top - popoverRect.height - gap;
				finalLeft =
					triggerRect.left +
					triggerRect.width / 2 -
					popoverRect.width / 2;
				break;
			case "bottom":
				finalTop = triggerRect.bottom + gap;
				finalLeft =
					triggerRect.left +
					triggerRect.width / 2 -
					popoverRect.width / 2;
				break;
			case "left":
				finalTop =
					triggerRect.top +
					triggerRect.height / 2 -
					popoverRect.height / 2;
				finalLeft = triggerRect.left - popoverRect.width - gap;
				break;
			case "right":
				finalTop =
					triggerRect.top +
					triggerRect.height / 2 -
					popoverRect.height / 2;
				finalLeft = triggerRect.right + gap;
				break;
		}

		// Clamp to screen edges
		const padding = 8;
		if (finalLeft < padding) finalLeft = padding;
		if (finalLeft + popoverRect.width > vw - padding)
			finalLeft = vw - popoverRect.width - padding;
		if (finalTop < padding) finalTop = padding;
		if (finalTop + popoverRect.height > vh - padding)
			finalTop = vh - popoverRect.height - padding;

		popoverRef.current.style.top = `${finalTop}px`;
		popoverRef.current.style.left = `${finalLeft}px`;
	};

	function showPopover() {
		clearTimeout(hideTimeoutRef.current);

		if (content && popoverRef.current) {
			const popover = popoverRef.current as HTMLDivElement & {
				showPopover?: () => void;
			};
			if (typeof popover.showPopover === "function") {
				try {
					popover.showPopover();
				} catch {
					// Ignore InvalidStateError if already open
				}
			} else {
				popoverRef.current.classList.add("fallback-open");
			}
			requestAnimationFrame(() => updatePopoverPosition());
			document.addEventListener("keydown", handleKeyDown);
			// Use capture phase (true) to catch scrolling on any nested scrollable containers
			window.addEventListener("scroll", handleScroll, true);
		}
	}

	// Add a slight delay to hidePopover to allow the user to hover over the tooltip itself (WCAG 1.4.13)
	function hidePopover(delay = 100) {
		hideTimeoutRef.current = setTimeout(() => {
			if (content && popoverRef.current) {
				const popover = popoverRef.current as HTMLDivElement & {
					hidePopover?: () => void;
				};
				if (typeof popover.hidePopover === "function") {
					try {
						popover.hidePopover();
					} catch {
						// Ignore error if already closed
					}
				} else {
					popoverRef.current.classList.remove("fallback-open");
				}
				document.removeEventListener("keydown", handleKeyDown);
				window.removeEventListener("scroll", handleScroll, true);
			}
		}, delay);
	}

	// Clean up timeouts and listeners on unmount
	useEffect(() => {
		return () => {
			clearTimeout(hideTimeoutRef.current);
			document.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("scroll", handleScroll, true);
		};
	}, [handleKeyDown, handleScroll]);

	if (!content) return children;

	const child = Children.only(children);

	const mergedRef = (node: HTMLElement) => {
		triggerRef.current = node;
		const childElement = child as React.ReactElement & {
			ref?: React.Ref<HTMLElement>;
		};
		const childRef = childElement.ref;
		if (typeof childRef === "function") {
			childRef(node);
		} else if (childRef && typeof childRef === "object") {
			(childRef as { current: HTMLElement | null }).current = node;
		}
	};

	return (
		<>
			{cloneElement(child, {
				// Programmatically associate the tooltip with the trigger element
				"aria-describedby": content ? popoverId : undefined,
				onBlur: (e: React.FocusEvent<HTMLElement>) => {
					hidePopover(0);
					child.props.onBlur?.(e);
				},
				onFocus: (e: React.FocusEvent<HTMLElement>) => {
					showPopover();
					child.props.onFocus?.(e);
				},
				onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
					showPopover();
					child.props.onMouseEnter?.(e);
				},
				onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
					hidePopover();
					child.props.onMouseLeave?.(e);
				},
				ref: mergedRef,
			})}
			<S.Tooltip
				id={popoverId}
				ref={popoverRef}
				role="tooltip"
				// Allow hover on the tooltip itself
				onMouseEnter={showPopover}
				onMouseLeave={() => hidePopover(100)}
			>
				{content}
			</S.Tooltip>
		</>
	);
};
