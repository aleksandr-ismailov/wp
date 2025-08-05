import { type WordPressPage } from '@/lib/wordpress-api';

interface WordPressContentProps {
	page: WordPressPage;
	className?: string;
}

export function WordPressContent( {
	page,
	className = '',
}: WordPressContentProps ) {
	return (
		<div className={ `wordpress-content ${ className }` }>
			{ page.title && (
				<h2 className="text-2xl font-bold mb-4">{ page.title }</h2>
			) }
			{ page.content && (
				<div
					className="prose prose-sm max-w-none"
					dangerouslySetInnerHTML={ { __html: page.content } }
				/>
			) }
		</div>
	);
}
