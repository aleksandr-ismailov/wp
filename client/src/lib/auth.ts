import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { WordPressUser } from './wordpress-api';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider( {
			name: 'WordPress',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize( credentials ) {
				if ( ! credentials?.username || ! credentials?.password ) {
					return null;
				}

				try {
					const WORDPRESS_URL =
						process.env.NEXT_PUBLIC_WORDPRESS_URL ||
						'http://localhost:8888';

					const response = await fetch(
						`${ WORDPRESS_URL }/index.php?rest_route=/wp/v2/users/me`,
						{
							method: 'GET',
							headers: {
								Authorization: `Basic ${ Buffer.from(
									`${ credentials.username }:${ credentials.password }`
								).toString( 'base64' ) }`,
								'Content-Type': 'application/json',
							},
						}
					);

					if ( ! response.ok ) {
						return null;
					}

					const wpUser = ( await response.json() ) as WordPressUser;

					return {
						id: wpUser.id.toString(),
						name: wpUser.display_name,
						email: wpUser.email,
						image: null,
						username: credentials.username,
						password: credentials.password,
					};
				} catch {
					return null;
				}
			},
		} ),
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/sign-in',
	},
	callbacks: {
		async jwt( { token, user } ) {
			if ( user ) {
				token.id = user.id;
				token.username = user.username;
				token.password = user.password;
			}
			return token;
		},
		async session( { session, token } ) {
			if ( token && session.user ) {
				session.user.id = token.id as string;
				session.user.username = token.username as string;
				session.user.password = token.password as string;
			}
			return session;
		},
	},
};
