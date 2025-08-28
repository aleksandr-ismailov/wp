import { api } from '@/shared/api/client';
import { apiRoutes } from '@/shared/routes';

export const logoutApi = api.injectEndpoints({
	endpoints: (build) => ({
		logout: build.mutation<void, void>({
			query: () => ({
				url: apiRoutes.apiV1AuthLogoutPath(),
				method: 'POST',
			}),
		}),
	}),
});

export const { useLogoutMutation } = logoutApi;
