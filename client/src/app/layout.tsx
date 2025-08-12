import { AuthProvider } from '@/components/providers/auth-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const font = Inter({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'nextjs',
	description: 'Webapp description',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning
				className={`${font.className} font-base bg-background relative flex max-h-dvh min-h-dvh w-full flex-col overflow-hidden antialiased`}
			>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
