import { NewsList } from '@/components/news/NewsList';
import SidebarColumn from '@/components/wordpress/SidebarColumn';
import { getSidebarsContent } from '@/lib/sidebars-api';

export const SidebarContent = async () => {
	const sidebarsData = await getSidebarsContent();

	return (
		<>
			<div className="w-[15%] hidden lg:block">
				<SidebarColumn
					content={sidebarsData?.leftSidebar?.content || ''}
				/>
			</div>
			<div className="grow-1 lg:w-[70%] flex flex-col max-h-full">
				<NewsList />
			</div>
			<div className="w-[15%] hidden lg:block">
				<SidebarColumn
					content={sidebarsData?.rightSidebar?.content || ''}
				/>
			</div>
		</>
	);
};
