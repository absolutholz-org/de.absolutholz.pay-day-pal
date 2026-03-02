import styled from "@emotion/styled";

export const FullBleedScrollableContainer = styled.div`
	/* calc(50% - (page-content-width / 2)) finds the exact distance from the edge of the screen to the edge of your centered content.
        We wrap it in max() so that on small screens, it defaults to your standard mobile padding.
	*/
	--scrollable-container-margin: max(
		var(--page-content-padding),
		calc(
			50% - (var(--page-content-max-width) / 2) +
				var(--page-content-padding)
		)
	);

	display: flex;
	gap: var(--sys-spacing-md);
	overflow-x: auto;
	scroll-padding-left: var(--scrollable-container-margin);
	scroll-snap-type: x mandatory;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}

	> * {
		flex-shrink: 0;
		scroll-snap-align: start;
	}

	> :first-child {
		margin-left: var(--scrollable-container-margin);
	}

	> :last-child {
		margin-right: var(--scrollable-container-margin);
	}
`;
