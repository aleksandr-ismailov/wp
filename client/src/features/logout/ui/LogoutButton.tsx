'use client';

import { appRoutes } from '@/shared/routes';
import { Button } from '@/shared/theme/components';
import { signOut } from 'next-auth/react';
import { useLogoutMutation } from '../api';

export const LogoutButton = () => {
	const [logout] = useLogoutMutation();

	const handleSignOut = async () => {
		try {
			await logout().unwrap();
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
