import { ApiError } from '@/shared/api/types';
import type { PagesResponse, WordPressPage, WordPressUser } from '../types';

const WORDPRESS_API_BASE =
	process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8888';

export const fetchWithAuth = async (
	endpoint: string,
	options: RequestInit = {},
	credentials?: { username: string; password: string }
): Promise<Response> => {
	const url = `${WORDPRESS_API_BASE}${endpoint}`;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(options.headers as Record<string, string>),
	};

	if (credentials) {
		const basicAuth = btoa(`${credentials.username}:${credentials.password}`);
		headers.Authorization = `Basic ${basicAuth}`;
	}

	const response = await fetch(url, {
		...options,
		headers,
		credentials: 'include',
	});

	return response;
};

export const getCurrentUser = async (credentials?: {
	username: string;
	password: string;
}): Promise<WordPressUser> => {
	const response = await fetchWithAuth('/client-api/v1/auth', {}, credentials);

	if (!response.ok) {
		const error: ApiError = {
			status: response.status,
			message:
				response.status === 401
					? 'User not authenticated'
					: 'Failed to fetch user data',
		};
		throw error;
	}

	const userData = (await response.json()) as WordPressUser;
	return userData;
};

export const getPages = async (
	params: {
		per_page?: number;
		page?: number;
	} = {},
	credentials?: { username: string; password: string }
): Promise<PagesResponse> => {
	const searchParams = new URLSearchParams();

	if (params.per_page) {
		searchParams.set('per_page', params.per_page.toString());
	}

	if (params.page) {
		searchParams.set('page', params.page.toString());
	}

	const queryString = searchParams.toString();
	const endpoint = `/client-api/v1/pages${queryString ? `?${queryString}` : ''}`;

	const response = await fetchWithAuth(endpoint, {}, credentials);

	if (!response.ok) {
		const error: ApiError = {
			status: response.status,
			message: 'Failed to fetch pages',
		};
		throw error;
	}

	const pagesData = (await response.json()) as PagesResponse;
	return pagesData;
};

export const getPageBySlug = async (
	slug: string
): Promise<WordPressPage | null> => {
	const pagesResponse = await getPages({ per_page: 100 });
	const page = pagesResponse.pages.find((p) => p.slug === slug);
	return page || null;
};

export const getPageById = async (
	id: number
): Promise<WordPressPage | null> => {
	const pagesResponse = await getPages({ per_page: 100 });
	const page = pagesResponse.pages.find((p) => p.id === id);
	return page || null;
};
