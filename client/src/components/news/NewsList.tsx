import { Alert, AlertDescription } from '@/components/ui/alert';
import { fetchRSSFeeds } from '@/lib/rss-server';
import { NewsItem } from './NewsItem';

export const NewsList = async () => {
	const items = await fetchRSSFeeds();

	return (
		<div className="flex-1 overflow-y-auto max-h-full min-h-0 flex flex-wrap items-stretch gap-6 justify-center">
			{items.length === 0 ? (
				<Alert>
					<AlertDescription>No news available</AlertDescription>
				</Alert>
			) : (
				items.map((item) => (
					<div key={item.link} className="w-[30%]">
						<NewsItem item={item} />
					</div>
				))
			)}
		</div>
	);
};
