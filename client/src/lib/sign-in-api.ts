import { camelizeKeys, isObject } from '@/lib/utils';
import { type WordPressPage } from '@/lib/wordpress-api';

export const getSignInContent = async (): Promise<WordPressPage | null> => {
	try {
		const WORDPRESS_API_BASE =
			process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8888';
		const response = await fetch(
			`${WORDPRESS_API_BASE}/index.php?rest_route=/client-api/v1/page/sign-in-content`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (response.ok) {
			const data: unknown = await response.json();
			if (isObject(data)) {
				return camelizeKeys(data) as unknown as WordPressPage;
			}
		}
		return null;
	} catch {
		return null;
	}
};
