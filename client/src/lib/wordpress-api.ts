export interface ApiError {
	status?: number;
	message: string;
}

export interface FormSettings {
	formTitle?: string;
	buttonText?: string;
}

export interface SeoData {
	metaTitle?: string;
	metaDescription?: string;
	robots?: string;
}

export interface WordPressUser {
	id: number;
	name: string;
	email?: string;
	url: string;
	description: string;
	link: string;
	slug: string;
	avatar_urls: {
		24: string;
		48: string;
		96: string;
	};
	meta: unknown[];
	roles?: string[];
}

export interface WordPressPage {
	id: number;
	date: string;
	date_gmt: string;
	guid: {
		rendered: string;
	};
	modified: string;
	modified_gmt: string;
	slug: string;
	status: string;
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
		protected: boolean;
	};
	excerpt: {
		rendered: string;
		protected: boolean;
	};
	author: number;
	featured_media: number;
	parent: number;
	menu_order: number;
	comment_status: string;
	ping_status: string;
	template: string;
	meta: Record<string, unknown>;
}

export interface PagesResponse {
	pages: WordPressPage[];
	total: number;
	total_pages: number;
	current_page: number;
	per_page: number;
}

const WORDPRESS_API_BASE =
	process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8888';

export async function fetchWithAuth(
	endpoint: string,
	options: RequestInit = {},
	credentials?: { username: string; password: string }
): Promise<Response> {
	const url = `${WORDPRESS_API_BASE}/index.php?rest_route=${endpoint}`;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(options.headers as Record<string, string>),
	};

	if (credentials) {
		const basicAuth = btoa(
			`${credentials.username}:${credentials.password}`
		);
		headers.Authorization = `Basic ${basicAuth}`;
	}

	const response = await fetch(url, {
		...options,
		headers,
		credentials: 'include',
	});

	return response;
}

export async function getCurrentUser(credentials?: {
	username: string;
	password: string;
}): Promise<WordPressUser> {
	const response = await fetchWithAuth(
		'/client-api/v1/auth',
		{},
		credentials
	);

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
}

export async function getPages(
	params: {
		per_page?: number;
		page?: number;
	} = {},
	credentials?: { username: string; password: string }
): Promise<PagesResponse> {
	const searchParams = new URLSearchParams();

	if (params.per_page) {
		searchParams.set('per_page', params.per_page.toString());
	}

	if (params.page) {
		searchParams.set('page', params.page.toString());
	}

	const queryString = searchParams.toString();
	const endpoint = `/client-api/v1/pages${
		queryString ? `?${queryString}` : ''
	}`;

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
}

export async function getPageBySlug(
	slug: string
): Promise<WordPressPage | null> {
	const pagesResponse = await getPages({ per_page: 100 });
	const page = pagesResponse.pages.find((p) => p.slug === slug);
	return page || null;
}

export async function getPageById(id: number): Promise<WordPressPage | null> {
	const pagesResponse = await getPages({ per_page: 100 });
	const page = pagesResponse.pages.find((p) => p.id === id);
	return page || null;
}
