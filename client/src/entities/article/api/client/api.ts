import { isNotEmpty } from 'ramda';

import { api } from '@/shared/api/client';
import { CacheTag } from '@/shared/api/client/';
import { apiRoutes } from '@/shared/routes';
import { ArticleSearchParams } from '../../lib/schemas';
import { ArticleResponse } from '../../types';

const providesTags = (result?: ArticleResponse) =>
	result && isNotEmpty(result.items)
		? [
				...result.items.map(({ url }) => ({
					type: CacheTag.Articles,
					id: url,
				})),
				CacheTag.Articles,
			]
		: [CacheTag.Articles];

export const articleApi = api.injectEndpoints({
	endpoints: (build) => ({
		article: build.query<ArticleResponse, ArticleSearchParams>({
			query: (params) => ({
				url: apiRoutes.apiV1ArticlesPath(),
				method: 'GET',
				params,
			}),
			providesTags: providesTags,
		}),
	}),
});

export const { useArticleQuery } = articleApi;
