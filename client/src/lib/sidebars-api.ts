import { camelizeKeys, isObject } from '@/lib/utils';

export interface SidebarContent {
	content: string;
}

export interface SidebarsResponse {
	leftSidebar: SidebarContent;
	rightSidebar: SidebarContent;
}

export const getSidebarsContent =
	async (): Promise<SidebarsResponse | null> => {
		try {
			const WORDPRESS_API_BASE =
				process.env.NEXT_PUBLIC_WORDPRESS_URL ||
				'http://localhost:8888';
			const response = await fetch(
				`${WORDPRESS_API_BASE}/index.php?rest_route=/client-api/v1/home-page-sidebars`,
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
					return camelizeKeys(data) as unknown as SidebarsResponse;
				}
			}
			return null;
		} catch {
			return null;
		}
	};
