import { Suspense } from 'react';

import {
	searchParamsSchema,
	type PaginatedArticleResponse,
} from '@/entities/article';
import { fetchArticles } from '@/entities/article/api/server';
import { getSidebarsContent } from '@/entities/sidebar-content';
import { SidebarColumn, SidebarSkeleton } from '@/entities/sidebar-content/ui';

import { ArticleList } from '@/widgets/article-list';
import { ArticleListSkeleton } from './ArticleListSkeleton';

interface ArticlesPageProps {
	searchParams?: Record<string, string | string[]>;
}

export const ArticlesPage = async (props: ArticlesPageProps) => {
	const { searchParams } = props;

	try {
		// Await searchParams before using it
		const params = searchParams ? await Promise.resolve(searchParams) : {};
		const validatedParams = searchParamsSchema.parse(params);

		const [sidebarsData, articleResponseData] = await Promise.all([
			getSidebarsContent(),
			fetchArticles(validatedParams),
		]);

		const articleData: PaginatedArticleResponse | null =
			articleResponseData && 'items' in articleResponseData
				? ({
						items: articleResponseData.items,
						hasMore: articleResponseData.hasMore,
						currentPage: articleResponseData.page,
						totalItems: articleResponseData.totalItems,
						requestedTags: articleResponseData.requestedTags,
					} as PaginatedArticleResponse)
				: null;

		return (
			<div className="flex-x grow-1 max-h-full min-h-full overflow-hidden">
				<div className="w-[15%] hidden lg:block">
					<Suspense fallback={<SidebarSkeleton />}>
						<SidebarColumn content={sidebarsData?.leftSidebar?.content || ''} />
					</Suspense>
				</div>
				<div className="grow-1 lg:w-[70%] flex flex-col max-h-full">
					<Suspense fallback={<ArticleListSkeleton />}>
						<ArticleList
							articleData={
								articleData ??
								(articleResponseData && 'message' in articleResponseData
									? articleResponseData
									: {
											items: [],
											hasMore: false,
											currentPage: 1,
											totalItems: 0,
											requestedTags: [],
										})
							}
						/>
					</Suspense>
				</div>
				<div className="w-[15%] hidden lg:block">
					<Suspense fallback={<SidebarSkeleton />}>
						<SidebarColumn
							content={sidebarsData?.rightSidebar?.content || ''}
						/>
					</Suspense>
				</div>
			</div>
		);
	} catch (error) {
		console.error('Failed to render articles page:', error);
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-red-500">
					Failed to load articles. Please try again later.
				</p>
			</div>
		);
	}
};
