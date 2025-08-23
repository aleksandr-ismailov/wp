import { parseApiError } from '@/shared/api/lib';
import { fetchData } from '@/shared/api/server';
import type { ApiError } from '@/shared/api/types';
import { apiRoutes } from '@/shared/routes';
import type { ArticleSearchParams } from '../../lib/schemas';
import { ArticleResponse } from '../../types';

export const fetchArticles = async (
	params: ArticleSearchParams
): Promise<ArticleResponse | ApiError> => {
	try {
		const data = await fetchData<ArticleResponse>({
			path: apiRoutes.apiV1ArticlesPath(),
			method: 'GET',
			params,
		});

		return data;
	} catch (error) {
		return parseApiError(error);
	}
};
