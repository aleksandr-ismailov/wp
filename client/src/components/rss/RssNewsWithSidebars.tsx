import SidebarColumn from '@/components/wordpress/SidebarColumn';
import { getSidebarsContent } from '@/lib/sidebars-api';
import { Suspense } from 'react';
import { RssNewsGrid } from './RssNewsGrid';
import { SidebarSkeleton } from './SidebarSkeleton';

const RssNewsWithSidebarsContent = async () => {
	const sidebarsData = await getSidebarsContent();

	return (
		<div className="flex-1 flex-x gap-4 max-h-full min-h-0">
			<div className="w-[15%] hidden lg:block">
				<SidebarColumn
					content={sidebarsData?.leftSidebar?.content || ''}
				/>
			</div>
			<div className="flex-1 lg:w-[70%] flex-y max-h-full min-h-0 overflow-hidden">
				<RssNewsGrid />
			</div>
			<div className="w-[15%] hidden lg:block">
				<SidebarColumn
					content={sidebarsData?.rightSidebar?.content || ''}
				/>
			</div>
		</div>
	);
};

export const RssNewsWithSidebars = () => {
	return (
		<Suspense fallback={<SidebarSkeleton />}>
			<RssNewsWithSidebarsContent />
		</Suspense>
	);
};
