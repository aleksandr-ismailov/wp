export interface RSSItem {
	title: string;
	link: string;
	description: string;
	pubDate: string;
	source: 'react' | 'nextjs';
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
