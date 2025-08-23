import { cn } from '@/shared/lib/client/className';
import * as React from 'react';

export const Skeleton = ({
	className,
	...props
}: React.ComponentProps<'div'>) => {
	return (
		<div
			data-slot="skeleton"
			className={cn('bg-accent animate-pulse rounded-ds-8', className)}
			{...props}
		/>
	);
};
