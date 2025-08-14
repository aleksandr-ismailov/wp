import { RefreshButton } from '@/components/news/RefreshButton';
import { SidebarContent } from '@/components/news/SidebarContent';
import { SidebarSkeleton } from '@/components/news/SidebarSkeleton';
import { Suspense } from 'react';

const NewsPage = () => {
	return (
		<div className="container mx-auto flex flex-col flex-1 max-h-full min-h-0">
			<h1 className="text-ds-xlarge font-bold text-center mb-8">
				React & Next.js News
			</h1>
			<div className="flex justify-center mb-4">
				<RefreshButton />
			</div>
			<div className="flex flex-1 gap-4 max-h-full min-h-0">
				<Suspense fallback={<SidebarSkeleton />}>
					<SidebarContent />
				</Suspense>
			</div>
		</div>
	);
};

export default NewsPage;
