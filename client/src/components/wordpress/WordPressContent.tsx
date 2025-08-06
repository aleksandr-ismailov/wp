interface WordPressContentProps {
	page: {
		title?: string;
		content: string;
		blockStyles?: string;
	};
	className?: string;
	showTitle?: boolean;
}

const WordPressContent: React.FC<WordPressContentProps> = ({
	page,
	className,
	showTitle = true,
}) => {
	return (
		<div className={`wp-content ${className || ''}`}>
			{page.blockStyles && (
				<style dangerouslySetInnerHTML={{ __html: page.blockStyles }} />
			)}
			{showTitle && page.title && (
				<h1 className="text-3xl font-bold mb-6">{page.title}</h1>
			)}
			<div
				className="wp-block-content max-w-none"
				dangerouslySetInnerHTML={{ __html: page.content }}
			/>
		</div>
	);
};

export default WordPressContent;
