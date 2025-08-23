import { apiRoutes } from '@/shared/routes';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { AuthResponse } from '../types';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'WordPress',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) {
					return null;
				}

				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_WORDPRESS_URL}${apiRoutes.apiV1AuthLoginPath()}`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								username: credentials.username,
								password: credentials.password,
							}),
						}
					);

					if (!response.ok) {
						return null;
					}

					const authData = (await response.json()) as AuthResponse;

					return {
						id: authData.user.id.toString(),
						name: authData.user.name,
						email: authData.user.email,
						image: null,
						accessToken: authData.accessToken,
					};
				} catch {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/sign-in',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.accessToken = user.accessToken;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user && token.id && token.accessToken) {
				session.user.id = token.id;
				session.accessToken = token.accessToken;
			}
			return session;
		},
	},
};
