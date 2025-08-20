import type { RSSItem } from '@/shared/types/rss';
import { camelizeKeys } from './utils';

interface DevToUser {
	name: string;
	username: string;
	twitterUsername: string | null;
	githubUsername: string | null;
	userId: number;
	websiteUrl: string;
	profileImage: string;
	profileImage90: string;
}

interface DevToArticle {
	typeOf: string;
	id: number;
	title: string;
	description: string;
	readablePublishDate: string;
	slug: string;
	path: string;
	url: string;
	commentsCount: number;
	publicReactionsCount: number;
	collectionId: number | null;
	publishedTimestamp: string;
	language: string;
	subforemId: number;
	positiveReactionsCount: number;
	coverImage: string | null;
	socialImage: string;
	canonicalUrl: string;
	createdAt: string;
	editedAt: string | null;
	crosspostedAt: string | null;
	publishedAt: string;
	lastCommentAt: string;
	readingTimeMinutes: number;
	tagList: string[];
	tags: string;
	user: DevToUser;
}

async function fetchDevToArticles(tag: string): Promise<DevToArticle[]> {
	try {
		const response = await fetch(
			`https://dev.to/api/articles?tag=${tag}&per_page=50`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const articles: unknown[] = await response.json();

		return articles.map(
			(article) =>
				camelizeKeys(article as Record<string, unknown>) as unknown
		) as DevToArticle[];
	} catch {
		return [];
	}
}

export async function fetchRSSFeeds(): Promise<RSSItem[]> {
	try {
		const [reactArticles, nextjsArticles, wordpressArticles] =
			await Promise.all([
				fetchDevToArticles('react'),
				fetchDevToArticles('nextjs'),
				fetchDevToArticles('wordpress'),
			]);

		const mapArticleToRSSItem = (
			article: DevToArticle,
			source: 'react' | 'nextjs' | 'wordpress'
		): RSSItem => ({
			title: article.title || '',
			link: article.url || '',
			description: article.description || '',
			pubDate: article.publishedTimestamp || article.createdAt || '',
			source,
			socialImage: article.socialImage || undefined,
		});

		const reactItems = reactArticles.map((article) =>
			mapArticleToRSSItem(article, 'react')
		);
		const nextjsItems = nextjsArticles.map((article) =>
			mapArticleToRSSItem(article, 'nextjs')
		);
		const wordpressItems = wordpressArticles.map((article) =>
			mapArticleToRSSItem(article, 'wordpress')
		);

		const allItems = [...reactItems, ...nextjsItems, ...wordpressItems];

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
