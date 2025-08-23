import type { SignInContent } from '../types';
import { fetchWithAuth } from './server';

export const getSignInContent = async (): Promise<SignInContent | null> => {
	try {
		const response = await fetchWithAuth('/client-api/v1/page/sign-in');

		if (response.ok) {
			const data = await response.json();
			return data as SignInContent;
		}
		return null;
	} catch {
		return null;
	}
};
