import Image from 'next/image';
import { ReactNode } from 'react';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { getSiteBranding } from '@/shared/api/site-branding';
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

	const branding = await getSiteBranding();

	const logoElement = branding.logoUrl ? (
		<Image
			src={branding.logoUrl}
			alt="Logo"
			width={128}
			height={128}
			className="object-contain"
		/>
	) : undefined;

	return (
		<LayoutContainer
			headerSlot={<Header logo={logoElement} />}
			footerSlot={
				<Footer
					copyrightText={branding.copyrightText}
					authorName={branding.authorName}
				/>
			}
		>
			{children}
		</LayoutContainer>
	);
};

export default ProtectedLayout;
