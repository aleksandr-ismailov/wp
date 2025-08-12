import { ReactNode } from 'react';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { LayoutContainer } from '@/shared/ui/layout-container';

interface AuthLayoutProps {
	children: ReactNode;
}

const AuthLayout = async (props: AuthLayoutProps) => {
	const { children } = props;

	const session = await getServerSession(authOptions);

	if (session) {
		redirect('/home');
	}

	return <LayoutContainer>{children}</LayoutContainer>;
};

export default AuthLayout;
