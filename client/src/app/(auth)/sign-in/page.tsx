import { SignInForm } from '@/components/auth/SignInForm';
import { WordPressContent } from '@/components/wordpress/WordPressContent';
import { camelizeKeys, isObject } from '@/lib/utils';
import { type WordPressPage } from '@/lib/wordpress-api';

const SignInPage = async () => {
	const getSignInContent = async (): Promise< WordPressPage | null > => {
		try {
			const WORDPRESS_API_BASE =
				process.env.WORDPRESS_URL || 'http://localhost:8888';
			const response = await fetch(
				`${ WORDPRESS_API_BASE }/index.php?rest_route=/client-api/v1/page/sign-in-content`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if ( response.ok ) {
				const data: unknown = await response.json();
				if ( isObject( data ) ) {
					return camelizeKeys( data ) as unknown as WordPressPage;
				}
			}
			return null;
		} catch ( error ) {
			console.log( 'No sign-in-content page found', error );
			return null;
		}
	};

	const signInContent = await getSignInContent();

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-4xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{ signInContent && (
						<div className="order-2 lg:order-1">
							<WordPressContent
								page={ signInContent }
								className="text-center lg:text-left"
							/>
						</div>
					) }
					<div
						className={ `order-1 lg:order-2 ${
							! signInContent
								? 'lg:col-span-2 flex justify-center'
								: ''
						}` }
					>
						<SignInForm
							formSettings={ signInContent?.formSettings }
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
