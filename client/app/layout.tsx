import '@/app/globals.css';
import { Providers } from '@/app/providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const font = Inter({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Webapp',
	description: 'Webapp description',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className={`${font.className} font-base bg-secondary/20 relative flex max-h-dvh min-h-dvh w-full flex-col items-center overflow-hidden antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
