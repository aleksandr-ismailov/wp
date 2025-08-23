export interface ArticleItem {
	id: number;
	title: string;
	url: string;
	description: string;
	publishedAt: string;
	source: 'react' | 'nextjs' | 'wordpress' | 'other';
	socialImage?: string;
	readingTime?: number;
	reactionsCount: number;
	commentsCount: number;
}

export interface PaginatedArticleResponse {
	items: ArticleItem[];
	hasMore: boolean;
	currentPage: number;
	totalItems: number;
	requestedTags: string[];
}

export interface ArticleResource {
	id: number;
	title: string;
	url: string;
	description: string;
	publishedAt: string;
	source: string;
	socialImage?: string;
	readingTime?: number;
	reactionsCount: number;
	commentsCount: number;
}

export interface ArticleResponse {
	items: ArticleResource[];
	hasMore: boolean;
	page: number;
	perPage: number;
	totalItems: number;
	requestedTags: string[];
}
