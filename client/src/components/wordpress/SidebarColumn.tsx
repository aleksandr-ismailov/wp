'use client';

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

interface SidebarColumnProps {
	content: string;
}

const SidebarColumn = ({ content }: SidebarColumnProps) => {
	const [cleanHTML, setCleanHTML] = useState<string>('');
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		if (content?.trim()) {
			const sanitized = DOMPurify.sanitize(content);
			setCleanHTML(sanitized);
		}
	}, [content]);

	if (!isClient || !content?.trim()) {
		return null;
	}

	return (
		<div
			className="w-full max-w-full overflow-hidden [&>div]:max-w-full [&_img]:max-w-full [&_img]:w-auto [&_img]:h-auto [&_img]:max-h-36 [&_img]:object-cover [&_img]:block [&_img]:mb-2"
			dangerouslySetInnerHTML={{ __html: cleanHTML }}
		/>
	);
};

export default SidebarColumn;
