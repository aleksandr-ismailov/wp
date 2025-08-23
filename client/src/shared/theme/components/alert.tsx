import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/client/className';

const alertVariants = cva(
	'relative w-full rounded-ds-8 border px-ds-16 py-ds-12 text-ds-14 grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-ds-12 gap-y-ds-2 items-start [&>svg]:size-ds-16 [&>svg]:translate-y-0.5 [&>svg]:text-current',
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground',
				destructive:
					'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export const Alert = ({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) => {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
};

export const AlertTitle = ({
	className,
	...props
}: React.ComponentProps<'div'>) => {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				'col-start-2 line-clamp-1 min-h-ds-16 font-medium tracking-tight',
				className
			)}
			{...props}
		/>
	);
};

export const AlertDescription = ({
	className,
	...props
}: React.ComponentProps<'div'>) => {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				'text-muted-foreground col-start-2 grid justify-items-start gap-ds-4 text-ds-14 [&_p]:leading-relaxed',
				className
			)}
			{...props}
		/>
	);
};
