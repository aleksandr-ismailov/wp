import { NewsList } from '@/components/news/NewsList';
import { NewsListSkeleton } from '@/components/news/NewsListSkeleton';
import { RefreshButton } from '@/components/news/RefreshButton';
import SidebarColumn from '@/components/wordpress/SidebarColumn';
import { getSidebarsContent } from '@/lib/sidebars-api';
import { Suspense } from 'react';

async function SidebarWrapper() {
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
}

function SidebarSkeleton() {
	return (
		<>
			<div className="w-[15%] hidden lg:block">
				<div className="animate-pulse bg-gray-200 h-32 rounded"></div>
			</div>

			<div className="flex-1 lg:w-[70%] flex flex-col max-h-full min-h-0">
				<NewsListSkeleton />
			</div>

			<div className="w-[15%] hidden lg:block">
				<div className="animate-pulse bg-gray-200 h-32 rounded"></div>
			</div>
		</>
	);
}

export default function Home() {
	return (
		<div className="container mx-auto p-6 flex flex-col flex-1 max-h-full min-h-0">
			<h1 className="text-ds-xlarge font-bold text-center mb-8">
				React & Next.js News
			</h1>

			<div className="flex justify-center mb-4">
				<RefreshButton />
			</div>

			<div className="flex flex-1 gap-4 max-h-full min-h-0">
				<Suspense fallback={<SidebarSkeleton />}>
					<SidebarWrapper />
				</Suspense>
			</div>
		</div>
	);
}
