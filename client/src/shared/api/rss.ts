import { ApiError, RssChannelConfig, RssFeed } from '@/shared/types/rss';
import Parser from 'rss-parser';

const parser = new Parser();

export const RSS_CHANNELS: RssChannelConfig[] = [
	{
		name: 'React',
		url: 'https://www.reddit.com/r/reactjs/.rss',
		category: 'react',
	},
	{
		name: 'Next.js',
		url: 'https://www.reddit.com/r/nextjs/.rss',
		category: 'nextjs',
	},
];

export async function fetchRssFeed(url: string): Promise<RssFeed> {
	try {
		const feed = await parser.parseURL(url);

		return {
			title: feed.title,
			description: feed.description,
			link: feed.link,
			language: feed.language,
			lastBuildDate: feed.lastBuildDate,
			items: feed.items.map((item) => ({
				title: item.title,
				link: item.link,
				pubDate: item.pubDate,
				creator: item.creator,
				content: item.content,
				contentSnippet: item.contentSnippet,
				guid: item.guid,
				categories: item.categories,
				isoDate: item.isoDate,
			})),
		};
	} catch (error) {
		const apiError: ApiError = {
			message:
				error instanceof Error
					? error.message
					: 'Failed to fetch RSS feed',
			status: 500,
		};
		throw apiError;
	}
}

export async function fetchAllRssFeeds(): Promise<
	Array<{ channel: RssChannelConfig; feed: RssFeed }>
> {
	const results = await Promise.allSettled(
		RSS_CHANNELS.map(async (channel) => {
			const feed = await fetchRssFeed(channel.url);
			return { channel, feed };
		})
	);

	return results
		.filter(
			(
				result
			): result is PromiseFulfilledResult<{
				channel: RssChannelConfig;
				feed: RssFeed;
			}> => result.status === 'fulfilled'
		)
		.map((result) => result.value);
}
