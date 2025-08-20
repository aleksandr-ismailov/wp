export interface RSSItem {
	title: string;
	link: string;
	description: string;
	pubDate: string;
	source: 'react' | 'nextjs' | 'wordpress';
	socialImage?: string;
}

export interface RssFeed {
	title?: string;
	description?: string;
	link?: string;
	language?: string;
	lastBuildDate?: string;
	items: RssItem[];
}

export interface RssChannelConfig {
	name: string;
	url: string;
	category: 'react' | 'nextjs' | 'wordpress';
}

export interface PaginationParams {
	page: number;
	perPage: number;
}

export interface PaginatedNewsResponse {
	items: RSSItem[];
	hasMore: boolean;
	currentPage: number;
}

export interface ApiError {
	message: string;
	status?: number;
}
