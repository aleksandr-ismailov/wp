import { getSignInContent } from '@/lib/sign-in-api';
import { SignInPage } from '@/views/sign-in';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const signInContent = await getSignInContent();

	return {
		title: signInContent?.seo?.metaTitle,
		description: signInContent?.seo?.metaDescription,
		robots: signInContent?.seo?.robots,
	};
}

const SignIn = async () => {
	const signInContent = await getSignInContent();

	return <SignInPage signInContent={signInContent} />;
};

export default SignIn;
