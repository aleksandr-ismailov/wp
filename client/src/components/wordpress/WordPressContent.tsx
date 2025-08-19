import { cn } from '@/lib/utils';
import type { WordPressPage } from '@/lib/wordpress-api';
import { RawHTML } from '@wordpress/element';

interface WordPressContentProps {
	page: Pick<WordPressPage, 'title' | 'content'>;
	className?: string;
}

const WordPressContent = (props: WordPressContentProps) => {
	const { page, className } = props;

	const content =
		typeof page.content === 'string'
			? page.content
			: page.content?.rendered || '';

	const title =
		typeof page.title === 'string'
			? page.title
			: page.title?.rendered || '';

	if (!content.trim()) {
		return null;
	}

	return (
		<div className={cn('wp-content', className)}>
			{title && (
				<h1 className="font-bold mb-6" style={{ fontSize: '32px' }}>
					{title}
				</h1>
			)}
			<div className="wp-block-content max-w-none">
				<RawHTML>{content}</RawHTML>
			</div>
		</div>
	);
};

export default WordPressContent;
