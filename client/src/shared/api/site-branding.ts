export const getSiteBranding = async (): Promise<{
	logoUrl: string | null;
	copyrightText: string;
	authorName: string;
}> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/client-api/v1/site-branding`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch site branding');
	}
	return response.json();
};
