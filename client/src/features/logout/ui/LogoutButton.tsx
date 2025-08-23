'use client';

import { fetchData } from '@/shared/api/server';
import { apiRoutes, appRoutes } from '@/shared/routes';
import { Button } from '@/shared/theme/components';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
	const handleSignOut = async () => {
		try {
			await fetchData({
				path: apiRoutes.apiV1AuthLogoutPath(),
				method: 'POST',
			});
			await signOut({ callbackUrl: appRoutes.signInPath() });
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<Button variant="outline" onClick={handleSignOut}>
			Sign Out
		</Button>
	);
};
