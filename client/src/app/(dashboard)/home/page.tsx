import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { fetchCurrentUser, fetchPages } from '@/lib/api-actions';
import { authOptions } from '@/lib/auth';
import { type WordPressPage, type WordPressUser } from '@/lib/wordpress-api';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { SignOutButton } from './sign-out-button';

export default async function HomePage() {
	const session = (await getServerSession(authOptions)) as Session | null;

	if (!session) {
		redirect('/sign-in');
	}

	if (!session.user?.username || !session.user?.password) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Card>
					<CardContent className="p-6">
						<p>Authentication error. Please sign in again.</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	let pages: WordPressPage[] = [];
	let user: WordPressUser | null = null;
	let error = '';

	try {
		const [pagesData, userData] = await Promise.all([
			fetchPages({ perPage: 5 }),
			fetchCurrentUser(),
		]);

		pages = pagesData.pages;
		user = userData;
	} catch (err) {
		console.error('Error loading data:', err);
		error = err instanceof Error ? err.message : 'Failed to load data';
	}

	return (
		<div className="min-h-screen bg-background p-4">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold">
							Welcome, {session.user.name}
						</h1>
						{user && (
							<p className="text-muted-foreground">
								{user.email || 'No email'} •{' '}
								{user.roles?.join(', ') || 'User'}
							</p>
						)}
					</div>
					<SignOutButton />
				</div>

				{error && (
					<Card>
						<CardContent className="p-6">
							<div className="text-destructive">{error}</div>
						</CardContent>
					</Card>
				)}

				{!error && (
					<Card>
						<CardHeader>
							<CardTitle>WordPress Pages</CardTitle>
							<CardDescription>
								Pages from your WordPress site
							</CardDescription>
						</CardHeader>
						<CardContent>
							{pages.length === 0 ? (
								<p className="text-muted-foreground">
									No pages found.
								</p>
							) : (
								<div className="space-y-4">
									{pages.map((page) => (
										<div
											key={page.id}
											className="border rounded-lg p-4"
										>
											<h3 className="font-semibold">
												{page.title.rendered}
											</h3>
											<p className="text-sm text-muted-foreground">
												{page.excerpt.rendered}
											</p>
											<div className="flex gap-2 mt-2 text-xs text-muted-foreground">
												<span>ID: {page.id}</span>
												<span>Slug: {page.slug}</span>
												<span>
													Status: {page.status}
												</span>
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
