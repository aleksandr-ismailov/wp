'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function RssRefreshButton() {
	const router = useRouter();
	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		router.refresh();
		setTimeout(() => setIsRefreshing(false), 1000);
	};

	return (
		<Button
			onClick={handleRefresh}
			disabled={isRefreshing}
			variant="outline"
			size="sm"
		>
			<RefreshCw
				className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
			/>
			Refresh
		</Button>
	);
}
