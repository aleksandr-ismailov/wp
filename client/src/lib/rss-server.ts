import type { RSSItem } from '@/types/rss';
import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchRSSFeeds(): Promise<RSSItem[]> {
	try {
		const [reactFeed, nextjsFeed] = await Promise.all([
			parser.parseURL('https://www.reddit.com/r/reactjs/.rss'),
			parser.parseURL('https://www.reddit.com/r/nextjs/.rss'),
		]);

		const reactItems: RSSItem[] = reactFeed.items.map((item) => ({
			title: item.title || '',
			link: item.link || '',
			description: item.contentSnippet || '',
			pubDate: item.pubDate || '',
			source: 'react',
		}));

		const nextjsItems: RSSItem[] = nextjsFeed.items.map((item) => ({
			title: item.title || '',
			link: item.link || '',
			description: item.contentSnippet || '',
			pubDate: item.pubDate || '',
			source: 'nextjs',
		}));

		return [...reactItems, ...nextjsItems]
			.sort(
				(a, b) =>
					new Date(b.pubDate).getTime() -
					new Date(a.pubDate).getTime()
			)
			.slice(0, 12);
	} catch (error) {
		console.error('RSS fetch error:', error);
		return [];
	}
}
