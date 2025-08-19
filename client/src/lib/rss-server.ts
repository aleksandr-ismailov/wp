import type { RSSItem } from '@/shared/types/rss';
import Parser from 'rss-parser';

interface RSSParserItem {
	title?: string;
	link?: string;
	contentSnippet?: string;
	content?: string;
	description?: string;
	pubDate?: string;
}

const parser = new Parser();

function cleanHtmlContent(htmlContent: string): string {
	if (!htmlContent) return '';

	return htmlContent
		.replace(/<[^>]*>/g, ' ')
		.replace(/&[^;]+;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export async function fetchRSSFeeds(): Promise<RSSItem[]> {
	try {
		const [reactFeed, nextjsFeed] = await Promise.all([
			parser.parseURL('https://dev.to/feed/tag/react'),
			parser.parseURL('https://dev.to/feed/tag/nextjs'),
		]);

		const mapFeedItems = (
			items: RSSParserItem[],
			source: 'react' | 'nextjs'
		): RSSItem[] =>
			items.map((item: RSSParserItem) => ({
				title: item.title || '',
				link: item.link || '',
				description:
					item.contentSnippet ||
					cleanHtmlContent(item.description || '') ||
					cleanHtmlContent(item.content || '') ||
					'',
				pubDate: item.pubDate || '',
				source,
			}));

		const reactItems = mapFeedItems(reactFeed.items, 'react');
		const nextjsItems = mapFeedItems(nextjsFeed.items, 'nextjs');

		const allItems = [...reactItems, ...nextjsItems];

		const uniqueItems = allItems.filter(
			(item, index, self) =>
				index === self.findIndex((t) => t.link === item.link)
		);

		return uniqueItems
			.sort(
				(a, b) =>
					new Date(b.pubDate).getTime() -
					new Date(a.pubDate).getTime()
			)
			.slice(0, 50);
	} catch {
		return [];
	}
}
