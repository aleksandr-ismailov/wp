'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider } from './theme-provider';
import { store } from '../store';

interface ProvidersProps {
	children: ReactNode;
}

export const Providers = (props: ProvidersProps) => {
	const { children } = props;

	return (
		<ThemeProvider>
			<SessionProvider>
				<Provider store={store}>{children}</Provider>
			</SessionProvider>
		</ThemeProvider>
	);
};
