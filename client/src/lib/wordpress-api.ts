export interface ApiError {
	status?: number;
	message: string;
}

export interface WordPressUser {
	id: number;
	username: string;
	email: string;
	display_name: string;
	roles: string[];
	capabilities: string[];
	authenticated: boolean;
}

export interface WordPressPage {
	id: number;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	date: string;
	modified: string;
	status: string;
	link: string;
	featured_image: string | null;
	meta: Record< string, unknown >;
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
	options: RequestInit = {}
): Promise< Response > {
	const url = `${ WORDPRESS_API_BASE }${ endpoint }`;

	const response = await fetch( url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
		credentials: 'include',
	} );

	return response;
}

export async function getCurrentUser(): Promise< WordPressUser > {
	const response = await fetchWithAuth( '/wp-json/client-api/v1/auth' );

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

	const userData = ( await response.json() ) as WordPressUser;
	return userData;
}

export async function getPages(
	params: {
		per_page?: number;
		page?: number;
	} = {}
): Promise< PagesResponse > {
	const searchParams = new URLSearchParams();

	if ( params.per_page ) {
		searchParams.set( 'per_page', params.per_page.toString() );
	}

	if ( params.page ) {
		searchParams.set( 'page', params.page.toString() );
	}

	const queryString = searchParams.toString();
	const endpoint = `/wp-json/client-api/v1/pages${
		queryString ? `?${ queryString }` : ''
	}`;

	const response = await fetchWithAuth( endpoint );

	if ( ! response.ok ) {
		const error: ApiError = {
			status: response.status,
			message: 'Failed to fetch pages',
		};
		throw error;
	}

	const pagesData = ( await response.json() ) as PagesResponse;
	return pagesData;
}

export async function getPageBySlug(
	slug: string
): Promise< WordPressPage | null > {
	const pagesResponse = await getPages( { per_page: 100 } );
	const page = pagesResponse.pages.find( ( p ) => p.slug === slug );
	return page || null;
}

export async function getPageById(
	id: number
): Promise< WordPressPage | null > {
	const pagesResponse = await getPages( { per_page: 100 } );
	const page = pagesResponse.pages.find( ( p ) => p.id === id );
	return page || null;
}
