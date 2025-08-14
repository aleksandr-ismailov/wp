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

	return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

export default SidebarColumn;
