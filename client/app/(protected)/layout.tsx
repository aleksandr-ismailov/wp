import Image from 'next/image';
import { ReactNode } from 'react';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { getSiteBranding } from '@/entities/sidebar-content/api';
import { authOptions } from '@/shared/api/server';
import { Footer, Header, LayoutContainer } from '@/shared/ui';

interface ProtectedLayoutProps {
	children: ReactNode;
}

const ProtectedLayout = async (props: ProtectedLayoutProps) => {
	const { children } = props;

	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/sign-in');
	}

	const branding = await getSiteBranding();

	const logoElement = branding?.logoUrl ? (
		<Image src={branding.logoUrl} alt="Logo" width={128} height={26} />
	) : undefined;

	return (
		<LayoutContainer
			headerSlot={<Header logo={logoElement} />}
			footerSlot={
				<Footer
					copyrightText={branding?.copyrightText ?? ''}
					authorName={branding?.authorName ?? ''}
				/>
			}
		>
			{children}
		</LayoutContainer>
	);
};

export default ProtectedLayout;
