import type { PagesResponse, WordPressPage, WordPressUser } from '../types';
import { fetchWithAuth } from './server';

export const fetchCurrentUser = async (): Promise<WordPressUser> => {
	const response = await fetchWithAuth('/wp/v2/users/me', {
		method: 'GET',
		headers: {
			context: 'edit',
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch current user');
	}

	return response.json();
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

	const response = await fetchWithAuth('/wp/v2/pages', {
		method: 'GET',
		headers: queryParams,
	});

	if (!response.ok) {
		throw new Error('Failed to fetch pages');
	}

	const pages = (await response.json()) as WordPressPage[];

	return {
		pages,
		total: pages.length,
		total_pages: 1,
		current_page: queryParams.page,
		per_page: queryParams.per_page,
	};
};

export const fetchPageBySlug = async (slug: string): Promise<WordPressPage> => {
	const response = await fetchWithAuth('/wp/v2/pages', {
		method: 'GET',
		headers: { slug },
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch page with slug "${slug}"`);
	}

	const pages = (await response.json()) as WordPressPage[];

	if (pages.length === 0) {
		throw new Error(`Page with slug "${slug}" not found`);
	}

	return pages[0];
};
