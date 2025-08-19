import { SidebarContent } from '@/components/news/SidebarContent';
import { SidebarSkeleton } from '@/components/news/SidebarSkeleton';
import { Suspense } from 'react';

const NewsPage = () => {
	return (
		<div className="flex grow-1 max-h-full min-h-0">
			<Suspense fallback={<SidebarSkeleton />}>
				<SidebarContent />
			</Suspense>
		</div>
	);
};

export default NewsPage;
