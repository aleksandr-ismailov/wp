import { Alert, AlertDescription } from '@/components/ui/alert';
import { fetchRSSFeeds } from '@/lib/rss-server';
import { NewsItem } from './NewsItem';

export const NewsList = async () => {
	const items = await fetchRSSFeeds();

	return (
		<div className="flex-1 overflow-y-auto max-h-full min-h-0">
			<div className="w-full px-ds-24 py-ds-24 space-y-ds-24">
				{items.length === 0 ? (
					<Alert>
						<AlertDescription>No news available</AlertDescription>
					</Alert>
				) : (
					items.map((item) => (
						<NewsItem key={item.link} item={item} />
					))
				)}
			</div>
		</div>
	);
};
