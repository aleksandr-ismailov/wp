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
	formSettings?: FormSettings;
	seo?: SeoData;
}

export interface PagesResponse {
	pages: WordPressPage[];
	total: number;
	total_pages: number;
	current_page: number;
	per_page: number;
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

export interface SignInContent extends WordPressPage {
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
		robots?: string;
	};
	formSettings?: FormSettings;
}
