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
		<header className="bg-card grow-0 border-b border-border w-full shadow-sm">
			<div className="mx-auto flex-x items-center justify-between p-ds-16 max-w-[90%]">
				<Link href="/home">{logo}</Link>
				<Button variant="outline" onClick={handleSignOut}>
					Sign Out
				</Button>
			</div>
		</header>
	);
};
