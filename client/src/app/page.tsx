import { NewsList } from '@/components/news/NewsList';
import { NewsListSkeleton } from '@/components/news/NewsListSkeleton';
import { RefreshButton } from '@/components/news/RefreshButton';
import { Suspense } from 'react';

export default function Home() {
	return (
		<div className="container mx-auto p-6 flex flex-col flex-1 max-h-full min-h-0">
			<h1 className="text-ds-xlarge font-bold text-center mb-8">
				React & Next.js News
			</h1>

			<div className="flex justify-center">
				<RefreshButton />
			</div>

			<Suspense fallback={<NewsListSkeleton />}>
				<NewsList />
			</Suspense>
		</div>
	);
}
