import styled from "@emotion/styled";

export const DateScroll_Container = styled.div`
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: none; /* IE/Edge */
	overflow-x: auto; /* Enable horizontal scrolling */
	scroll-padding-left: 0.25rem;
	scroll-snap-type: x mandatory;

	/* Optional: Hide scrollbar for a cleaner mobile/app feel */
	scrollbar-width: none; /* Firefox */
	width: 100%; /* Force it to fit within the browser/parent */
`;

export const DateScroll = styled.ol`
	align-items: center;
	display: grid;
	gap: 0.75rem;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	margin-bottom: 2rem;
	padding: 0.5rem 0.25rem;
	width: max-content;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const DateScroll_ListItem = styled.li`
	scroll-snap-align: start;
`;
