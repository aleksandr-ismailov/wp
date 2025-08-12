import { fetchData } from './api';
import { type WordPressPage, type WordPressUser } from './wordpress-api';

interface PagesResponse {
	pages: WordPressPage[];
	total: number;
	totalPages: number;
	currentPage: number;
	perPage: number;
}

export const fetchCurrentUser = async (): Promise<WordPressUser> => {
	const data = await fetchData<WordPressUser>('/wp/v2/users/me', 'GET', {
		context: 'edit',
	});
	return data;
};

export const fetchPages = async (
	params: {
		perPage?: number;
		page?: number;
	} = {}
): Promise<PagesResponse> => {
	const queryParams = {
		per_page: params.perPage || 5,
		page: params.page || 1,
		orderby: 'title',
		order: 'asc',
	};

	const pages = await fetchData<WordPressPage[]>(
		'/wp/v2/pages',
		'GET',
		queryParams
	);

	return {
		pages: pages,
		total: pages.length,
		totalPages: 1,
		currentPage: queryParams.page,
		perPage: queryParams.per_page,
	};
};

export const fetchPageBySlug = async (slug: string): Promise<WordPressPage> => {
	const pages = await fetchData<WordPressPage[]>('/wp/v2/pages', 'GET', {
		slug,
	});

	if (pages.length === 0) {
		throw new Error(`Page with slug "${slug}" not found`);
	}

	return pages[0];
};
