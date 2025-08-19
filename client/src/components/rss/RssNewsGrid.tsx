import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchRSSFeeds } from '@/lib/rss-server';
import type { RSSItem } from '@/shared/types/rss';

interface NewsItemProps {
	item: RSSItem;
}

const NewsItem = ({ item }: NewsItemProps) => {
	return (
		<Card className="h-full">
			<CardHeader>
				<div className="flex justify-between items-center mb-2">
					<span
						className={`px-2 py-1 rounded text-ds-small ${
							item.source === 'react'
								? 'bg-blue-500 text-white'
								: 'bg-black text-white'
						}`}
					>
						{item.source === 'react' ? 'React' : 'Next.js'}
					</span>
					<span className="text-ds-small text-muted-foreground">
						{new Date(item.pubDate).toLocaleDateString()}
					</span>
				</div>
				<CardTitle className="text-ds-large">
					<a
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-primary"
					>
						{item.title}
					</a>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-ds-medium text-muted-foreground">
					{item.description.slice(0, 150)}...
				</p>
			</CardContent>
		</Card>
	);
};

export const RssNewsGrid = async () => {
	const items = await fetchRSSFeeds();

	return (
		<div className="flex-1 overflow-y-auto max-h-full min-h-0 pt-ds-24 px-ds-16">
			{items.length === 0 ? (
				<Alert>
					<AlertDescription>No news available</AlertDescription>
				</Alert>
			) : (
				<div className="flex-x flex-wrap items-stretch gap-6 justify-center">
					{items.map((item, index) => (
						<div
							key={`${item.source}-${index}-${item.link}`}
							className="w-[30%]"
						>
							<NewsItem item={item} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};
