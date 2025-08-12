import { ReactNode } from 'react';

interface LayoutContainerProps {
	headerSlot?: ReactNode;
	children: ReactNode;
	footerSlot?: ReactNode;
}

export const LayoutContainer = (props: LayoutContainerProps) => {
	const { headerSlot, children, footerSlot } = props;

	return (
		<div className="flex-y gap-y-ds-16 w-full overflow-hidden">
			{headerSlot}
			{children}
			{footerSlot}
		</div>
	);
};
