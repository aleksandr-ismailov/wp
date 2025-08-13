import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RssChannelConfig, RssFeed } from '@/shared/types/rss';

interface RssNewsListProps {
	feeds: Array<{ channel: RssChannelConfig; feed: RssFeed }>;
	isLoading?: boolean;
	error?: string;
}

export function RssNewsList({ feeds, isLoading, error }: RssNewsListProps) {
	if (isLoading) {
		return (
			<div className="space-y-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<Card key={i} className="p-4">
						<Skeleton className="h-4 w-3/4 mb-2" />
						<Skeleton className="h-3 w-1/2 mb-2" />
						<Skeleton className="h-3 w-full" />
					</Card>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	if (feeds.length === 0) {
		return (
			<Alert>
				<AlertDescription>No RSS feeds available.</AlertDescription>
			</Alert>
		);
	}

	const allItems = feeds.flatMap(({ channel, feed }) =>
		feed.items.map((item) => ({
			...item,
			channel: channel.name,
			category: channel.category,
		}))
	);

	const sortedItems = allItems
		.filter((item) => item.title && item.link)
		.sort((a, b) => {
			const dateA = new Date(a.isoDate || a.pubDate || 0);
			const dateB = new Date(b.isoDate || b.pubDate || 0);
			return dateB.getTime() - dateA.getTime();
		})
		.slice(0, 20);

	return (
		<div className="space-y-4">
			{sortedItems.map((item, index) => (
				<Card
					key={`${item.guid || item.link}-${index}`}
					className="p-4 hover:shadow-md transition-shadow"
				>
					<div className="flex items-start justify-between mb-2">
						<span
							className={`text-xs px-2 py-1 rounded-full ${
								item.category === 'react'
									? 'bg-blue-100 text-blue-800'
									: 'bg-gray-100 text-gray-800'
							}`}
						>
							{item.channel}
						</span>
						{item.isoDate && (
							<span className="text-xs text-gray-500">
								{new Date(item.isoDate).toLocaleDateString()}
							</span>
						)}
					</div>

					<a
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						className="block hover:text-blue-600 transition-colors"
					>
						<h3 className="font-semibold text-sm mb-2 line-clamp-2">
							{item.title}
						</h3>
					</a>

					{item.contentSnippet && (
						<p className="text-sm text-gray-600 line-clamp-3">
							{item.contentSnippet}
						</p>
					)}
				</Card>
			))}
		</div>
	);
}
