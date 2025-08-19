'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

interface HeaderProps {
	logo?: ReactNode;
}

export const Header = (props: HeaderProps) => {
	const { logo } = props;

	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/sign-in' });
	};

	return (
		<header className="bg-background border-b border-border">
			<div className="container mx-auto px-4 py-3 flex items-center justify-between">
				<Link href="/home" className="flex items-center space-x-2">
					{logo}
				</Link>

				<Button variant="outline" onClick={handleSignOut}>
					Sign Out
				</Button>
			</div>
		</header>
	);
};
