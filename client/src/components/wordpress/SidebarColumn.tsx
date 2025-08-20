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
			className="max-h-full overflow-hidden pb-[var(--spacing-16)] [&_img]:max-w-full [&_img]:h-auto [&_img]:max-h-full [&_img]:mb-[var(--spacing-16)]"
			dangerouslySetInnerHTML={{ __html: cleanHTML }}
		/>
	);
};

export default SidebarColumn;
