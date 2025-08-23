import { RawHTML } from '@wordpress/element';

import type { WordPressPage } from '@/shared/api/types';
import { cn } from '@/shared/lib/client/className';

interface WordPressContentProps {
	page: Pick<WordPressPage, 'title' | 'content'>;
	className?: string;
}

export const WordPressContent = (props: WordPressContentProps) => {
	const { page, className } = props;

	const content =
		typeof page.content === 'string'
			? page.content
			: page.content?.rendered || '';

	const title =
		typeof page.title === 'string' ? page.title : page.title?.rendered || '';

	if (!content.trim()) {
		return null;
	}

	return (
		<div className={cn('wp-content', className)}>
			{title && <h1 className="font-bold mb-ds-24 text-ds-32">{title}</h1>}
			<div className="wp-block-content max-w-none">
				<RawHTML>{content}</RawHTML>
			</div>
		</div>
	);
};
