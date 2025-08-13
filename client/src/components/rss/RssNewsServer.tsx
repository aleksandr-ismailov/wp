import { Alert, AlertDescription } from '@/components/ui/alert';
import { fetchAllRssFeeds } from '@/shared/api/rss';
import { RssNewsList } from './RssNewsList';

export async function RssNewsServer() {
	try {
		const feeds = await fetchAllRssFeeds();

		return <RssNewsList feeds={feeds} />;
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Failed to load RSS feeds';

		return (
			<Alert variant="destructive">
				<AlertDescription>{errorMessage}</AlertDescription>
			</Alert>
		);
	}
}
