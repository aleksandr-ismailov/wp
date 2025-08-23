import { type PaginatedArticleResponse } from '@/entities/article';
import { ArticleItem } from '@/entities/article/ui/ArticleItem';
import type { ApiError } from '@/shared/api/types';
import { ArticlePagination } from './ArticlePagination';

interface ArticleListProps {
	articleData: PaginatedArticleResponse | ApiError;
}

export const ArticleList = (props: ArticleListProps) => {
	const { articleData } = props;

	if ('message' in articleData) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="text-center">
					<h2 className="text-xl font-semibold mb-2">
						Failed to load articles
					</h2>
					<p className="text-muted-foreground">{articleData.message}</p>
				</div>
			</div>
		);
	}

	if (articleData.items.length === 0) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="text-center">
					<h2 className="text-xl font-semibold mb-2">No articles found</h2>
					<p className="text-muted-foreground">Try refreshing the page</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 overflow-y-auto max-h-full min-h-0">
			<div className="w-full px-ds-24 space-y-ds-24">
				{articleData.items.map((item) => (
					<ArticleItem key={item.id} item={item} />
				))}
			</div>
			<div className="sticky bottom-0 py-ds-16">
				<ArticlePagination
					currentPage={articleData.currentPage}
					hasMore={articleData.hasMore}
				/>
			</div>
		</div>
	);
};
