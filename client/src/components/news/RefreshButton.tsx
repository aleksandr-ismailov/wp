'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function RefreshButton() {
	const router = useRouter();

	const handleRefresh = () => {
		router.refresh();
	};

	return (
		<Button onClick={handleRefresh} variant="outline" className="mb-6">
			Refresh News
		</Button>
	);
}
