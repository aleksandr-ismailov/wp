'use client';

import { fetchRSSFeeds } from '@/lib/rss-server';
import type { RSSItem } from '@/shared/types/rss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NewsItem } from './NewsItem';
import { NewsListSkeleton } from './NewsListSkeleton';
import { NewsPagination } from './NewsPagination';

export const NewsList = () => {
	const [articles, setArticles] = useState<RSSItem[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const perPage = 20;

	useEffect(() => {
		const loadArticles = async () => {
			setIsLoading(true);
			try {
				const response = await fetchRSSFeeds(currentPage, perPage);
				setArticles(response.items);
				setHasMore(response.hasMore);
			} catch {
				setArticles([]);
				setHasMore(false);
			} finally {
				setIsLoading(false);
			}
		};

		loadArticles();
	}, [currentPage, perPage]);

	const stableHasMore = useMemo(() => {
		return isLoading ? true : hasMore;
	}, [hasMore, isLoading]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (isLoading && articles.length === 0) {
		return <NewsListSkeleton />;
	}

	return (
		<div
			ref={scrollContainerRef}
			className="flex-1 overflow-y-auto max-h-full min-h-0"
		>
			<div className="w-full px-ds-24 pt-ds-24 space-y-ds-24">
				{articles.map((item) => (
					<NewsItem key={item.link} item={item} />
				))}
			</div>

			<div className="sticky bottom-0 py-4">
				<NewsPagination
					currentPage={currentPage}
					hasMore={stableHasMore}
					onPageChange={handlePageChange}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};
