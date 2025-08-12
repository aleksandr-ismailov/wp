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
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
			{signInContent && (
				<WordPressContent
					page={signInContent}
					className="w-1/2 max-w-[440px] p-ds-16 text-center lg:text-left"
				/>
			)}
			<div className="w-1/2 max-w-[440px] p-ds-16 flex-x justify-start">
				<SignInForm formSettings={signInContent?.formSettings} />
			</div>
		</div>
	);
};

export default SignInPage;
