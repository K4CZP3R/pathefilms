export type Show = {
	backgroundDominantColor: string;
	backgroundPath: {
		lg: string;
	};
	cinechecks: Array<{
		ref: string;
		description: string;
	}>;
	contentRating: {
		ref: string;
		description: string;
	};
	directors: string[];
	duration: number;
	flag: string | null;
	flagColor: string | null;
	genericOrder: number;
	genres: string[];
	homeOrder: number;
	hubbleCasting: string;
	isComingSoon: boolean;
	isEventSpecial: boolean;
	isMovie: boolean;
	isNew: boolean;
	label: string | null;
	labelFlagColor: string | null;
	mostAwaitedOrder: number;
	next24ShowtimesCount: number;
	notComingSoon: boolean;
	originalReleaseAt: string | null;
	posterPath: Record<string, string>;
	releaseAt: string[];
	salesOpeningDatetime: string | null;
	showRef: string;
	showtimesDisplayDatetime: string | null;
	slug: string;
	specialEvent: boolean;
	title: string;
	type: string;
	upcomingOrder: number;
	warning: string | null;
};

export type ShowsResponse = {
	contentratings: unknown[];
	labels: unknown[];
	shows: Show[];
};
