import { NewsListSkeleton } from '@/components/news/NewsListSkeleton';

export const SidebarSkeleton = () => {
	return (
		<>
			<div className="w-[15%] hidden lg:block">
				<div className="animate-pulse bg-gray-200 h-32 rounded"></div>
			</div>
			<div className="grow-1 lg:w-[70%] flex flex-col max-h-full min-h-0">
				<NewsListSkeleton />
			</div>
			<div className="w-[15%] hidden lg:block">
				<div className="animate-pulse bg-gray-200 h-32 rounded"></div>
			</div>
		</>
	);
};
