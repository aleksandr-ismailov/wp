import { LogoutButton } from '@/features/logout';
import Link from 'next/link';
import { ReactNode } from 'react';

interface HeaderProps {
	logo?: ReactNode;
}

export const Header = (props: HeaderProps) => {
	const { logo } = props;

	return (
		<header className="bg-card grow-0 border-b border-border w-full shadow-sm">
			<div className="mx-auto flex-x items-center justify-between p-ds-16 max-w-[90%]">
				<Link href="/home">{logo}</Link>
				<LogoutButton />
			</div>
		</header>
	);
};
