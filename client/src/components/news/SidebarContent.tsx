import { NewsList } from '@/components/news/NewsList';
import { NewsListSkeleton } from '@/components/news/NewsListSkeleton';
import SidebarColumn from '@/components/wordpress/SidebarColumn';
import { getSidebarsContent } from '@/lib/sidebars-api';
import { Suspense } from 'react';

export const SidebarContent = async () => {
	const sidebarsData = await getSidebarsContent();

	return (
		<>
			<div className="w-[15%] hidden lg:block">
				<SidebarColumn
					content={sidebarsData?.leftSidebar?.content || ''}
				/>
			</div>
			<div className="flex-1 lg:w-[70%] flex flex-col max-h-full min-h-0">
				<Suspense fallback={<NewsListSkeleton />}>
					<NewsList />
				</Suspense>
			</div>
			<div className="w-[15%] hidden lg:block">
				<SidebarColumn
					content={sidebarsData?.rightSidebar?.content || ''}
				/>
			</div>
		</>
	);
};
