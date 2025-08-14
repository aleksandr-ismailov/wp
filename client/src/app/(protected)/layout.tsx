import { ReactNode } from 'react';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { Footer } from '@/shared/ui/footer';
import { Header } from '@/shared/ui/header';
import { LayoutContainer } from '@/shared/ui/layout-container';

interface ProtectedLayoutProps {
	children: ReactNode;
}

const ProtectedLayout = async (props: ProtectedLayoutProps) => {
	const { children } = props;

	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/sign-in');
	}

	return (
		<LayoutContainer headerSlot={<Header />} footerSlot={<Footer />}>
			{children}
		</LayoutContainer>
	);
};

export default ProtectedLayout;
