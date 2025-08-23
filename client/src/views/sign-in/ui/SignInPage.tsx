import { WordPressContent } from '@/entities/wordpress';
import type { SignInContent } from '@/entities/wordpress/types';
import { SignInForm } from '@/features/login';

interface SignInPageProps {
	signInContent: SignInContent | null;
}

export const SignInPage = (props: SignInPageProps) => {
	const { signInContent } = props;

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-ds-16">
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
