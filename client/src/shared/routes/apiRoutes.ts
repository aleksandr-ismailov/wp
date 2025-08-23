export const apiRoutes = {
	apiV1AuthLoginPath: () => '/wp-json/client-api/v1/auth/login',
	apiV1AuthLogoutPath: () => '/wp-json/client-api/v1/auth/logout',
	apiV1BrandingPath: () => '/wp-json/client-api/v1/site-branding',
	apiV1ArticlesPath: () => '/wp-json/client-api/v1/news',
	apiV1PagePath: (slug: string) => `/wp-json/client-api/v1/page/${slug}`,
	apiV1SidebarsPath: () => '/wp-json/client-api/v1/home-page-sidebars',
};
