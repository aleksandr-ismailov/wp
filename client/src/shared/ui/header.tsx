'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const Header = () => {
	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/sign-in' });
	};

	return (
		<header className="bg-background border-b border-border">
			<div className="container mx-auto px-4 py-3 flex items-center justify-between">
				<Link href="/home" className="flex items-center space-x-2">
					<div className="text-xl font-semibold text-foreground">
						WordPress
					</div>
				</Link>

				<Button variant="outline" onClick={handleSignOut}>
					Sign Out
				</Button>
			</div>
		</header>
	);
};
