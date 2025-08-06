import { SignInForm } from '@/components/auth/SignInForm';
import WordPressContent from '@/components/wordpress/WordPressContent';
import { getSignInContent } from '@/lib/sign-in-api';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const signInContent = await getSignInContent();

	return {
		title: signInContent?.seo?.metaTitle,
		description: signInContent?.seo?.metaDescription,
		robots: signInContent?.seo?.robots,
	};
}

const SignInPage = async () => {
	const signInContent = await getSignInContent();

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-4xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{signInContent && (
						<div className="order-2 lg:order-1">
							<WordPressContent
								page={signInContent}
								className="text-center lg:text-left"
							/>
						</div>
					)}
					<div
						className={`order-1 lg:order-2 ${
							!signInContent
								? 'lg:col-span-2 flex justify-center'
								: ''
						}`}
					>
						<SignInForm
							formSettings={signInContent?.formSettings}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
