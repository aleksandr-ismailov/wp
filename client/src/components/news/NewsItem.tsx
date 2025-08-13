import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RSSItem } from '@/types/rss';

interface NewsItemProps {
	item: RSSItem;
}

export function NewsItem({ item }: NewsItemProps) {
	return (
		<Card className="h-full">
			<CardHeader>
				<div className="flex justify-between items-center mb-2">
					<span
						className={`px-2 py-1 rounded text-ds-small ${
							item.source === 'react'
								? 'bg-blue-500 text-white'
								: 'bg-black text-white'
						}`}
					>
						{item.source === 'react' ? 'React' : 'Next.js'}
					</span>
					<span className="text-ds-small text-muted-foreground">
						{new Date(item.pubDate).toLocaleDateString()}
					</span>
				</div>
				<CardTitle className="text-ds-large">
					<a
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-primary"
					>
						{item.title}
					</a>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-ds-medium text-muted-foreground">
					{item.description.slice(0, 150)}...
				</p>
			</CardContent>
		</Card>
	);
}
