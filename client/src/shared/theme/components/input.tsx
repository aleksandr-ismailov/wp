import * as React from 'react';

import { cn } from '@/shared/lib/client/className';

export const Input = ({
	className,
	type,
	...props
}: React.ComponentProps<'input'>) => {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-ds-24 w-full min-w-0 rounded-ds-8 border bg-transparent px-ds-12 py-ds-4 text-ds-16 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-ds-20 file:border-0 file:bg-transparent file:text-ds-14 file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-ds-14',
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className
			)}
			{...props}
		/>
	);
};
