import DOMPurify from 'isomorphic-dompurify';

interface SidebarColumnProps {
	content: string;
}

export const SidebarColumn = (props: SidebarColumnProps) => {
	const { content } = props;

	return (
		<div
			className="p-ds-16"
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(content),
			}}
		/>
	);
};
