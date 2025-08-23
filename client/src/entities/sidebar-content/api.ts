import { fetchData } from '@/shared/api/server';
import { apiRoutes } from '@/shared/routes/apiRoutes';
import type {
	SidebarsApiResponse,
	SidebarsResponse,
	SiteBranding,
	SiteBrandingApiResponse,
} from './types';

export const getSidebarsContent =
	async (): Promise<SidebarsResponse | null> => {
		try {
			const apiResponse = await fetchData<SidebarsApiResponse>({
				path: apiRoutes.apiV1SidebarsPath(),
				method: 'GET',
			});

			if (apiResponse?.success && apiResponse?.data) {
				return apiResponse.data;
			}

			return null;
		} catch (error) {
			console.error('Failed to fetch sidebars:', error);
			return null;
		}
	};

export const getSiteBranding = async (): Promise<SiteBranding | null> => {
	try {
		const apiResponse = await fetchData<SiteBrandingApiResponse>({
			path: apiRoutes.apiV1BrandingPath(),
			method: 'GET',
		});

		if (apiResponse?.success && apiResponse?.data) {
			return apiResponse.data;
		}

		return null;
	} catch (error) {
		console.error('Failed to fetch site branding:', error);
		return null;
	}
};
