export interface RssItem {
	title?: string;
	link?: string;
	pubDate?: string;
	creator?: string;
	content?: string;
	contentSnippet?: string;
	guid?: string;
	categories?: string[];
	isoDate?: string;
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
	category: 'react' | 'nextjs';
}

export interface ApiError {
	message: string;
	status?: number;
}
