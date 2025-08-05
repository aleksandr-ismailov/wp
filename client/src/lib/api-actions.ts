import { fetchData } from './api';
import { type WordPressPage, type WordPressUser } from './wordpress-api';

interface PagesResponse {
	pages: WordPressPage[];
	total: number;
	totalPages: number;
	currentPage: number;
	perPage: number;
}

export const fetchCurrentUser = async (): Promise< WordPressUser > => {
	const data = await fetchData< WordPressUser >(
		'/client-api/v1/auth',
		'GET'
	);
	return data;
};

export const fetchPages = async (
	params: {
		perPage?: number;
		page?: number;
	} = {}
): Promise< PagesResponse > => {
	const data = await fetchData< PagesResponse >(
		'/client-api/v1/pages',
		'GET',
		params
	);
	return data;
};

export const fetchPageBySlug = async (
	slug: string
): Promise< WordPressPage > => {
	const data = await fetchData< WordPressPage >(
		`/client-api/v1/page/${ slug }`,
		'GET'
	);
	return data;
};
