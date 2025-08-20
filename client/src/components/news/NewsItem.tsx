import { Card, CardContent } from '@/components/ui/card';
import type { RSSItem } from '@/shared/types/rss';
import Image from 'next/image';

interface NewsItemProps {
	item: RSSItem;
}

const getSourceConfig = (source: string) => {
	switch (source) {
		case 'react':
			return {
				name: 'React',
				bgColor: 'bg-blue-500',
				textColor: 'text-white',
			};
		case 'nextjs':
			return {
				name: 'Next.js',
				bgColor: 'bg-black',
				textColor: 'text-white',
			};
		case 'wordpress':
			return {
				name: 'WordPress',
				bgColor: 'bg-blue-600',
				textColor: 'text-white',
			};
		default:
			return {
				name: source,
				bgColor: 'bg-gray-500',
				textColor: 'text-white',
			};
	}
};

export function NewsItem({ item }: NewsItemProps) {
	const sourceConfig = getSourceConfig(item.source);

	return (
		<Card className="w-full">
			<div className="flex flex-col lg:flex-row">
				{item.socialImage && (
					<div className="lg:w-1/3 xl:w-1/4 p-ds-24 lg:pr-0">
						<div className="h-48 lg:h-full min-h-[200px] relative overflow-hidden rounded-lg">
							<Image
								src={item.socialImage}
								alt={item.title}
								fill
								className="object-cover"
								unoptimized
							/>
						</div>
					</div>
				)}

				<div className="flex-1">
					<CardContent className="pt-ds-24">
						<div className="space-y-ds-16">
							<div className="flex items-center justify-between flex-wrap gap-ds-8">
								<span
									className={`px-ds-12 py-ds-6 rounded-full text-ds-small font-medium ${sourceConfig.bgColor} ${sourceConfig.textColor}`}
								>
									{sourceConfig.name}
								</span>
								<span className="text-ds-small text-muted-foreground">
									{new Date(item.pubDate).toLocaleDateString(
										'en-US',
										{
											day: 'numeric',
											month: 'short',
											hour: '2-digit',
											minute: '2-digit',
										}
									)}
								</span>
							</div>

							<div className="space-y-ds-12">
								<h3 className="font-semibold text-ds-large lg:text-ds-xlarge leading-tight">
									<a
										href={item.link}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-primary transition-colors"
									>
										{item.title}
									</a>
								</h3>

								{item.description && (
									<p className="text-ds-medium text-muted-foreground leading-relaxed">
										{item.description.length > 300
											? `${item.description.slice(0, 300)}...`
											: item.description}
									</p>
								)}
							</div>

							<div className="flex items-center justify-between pt-ds-12 border-t">
								<a
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center text-ds-medium text-primary hover:text-primary/80 font-medium transition-colors"
								>
									Read more
									<svg
										className="ml-ds-6 h-4 w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
								<div className="text-ds-small text-muted-foreground">
									dev.to
								</div>
							</div>
						</div>
					</CardContent>
				</div>
			</div>
		</Card>
	);
}
