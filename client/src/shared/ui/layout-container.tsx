import { ReactNode } from 'react';

interface LayoutContainerProps {
	headerSlot?: ReactNode;
	children: ReactNode;
	footerSlot?: ReactNode;
}

export const LayoutContainer = (props: LayoutContainerProps) => {
	const { headerSlot, children, footerSlot } = props;

	return (
		<div className="flex-y w-full overflow-hidden grow-1 items-center justify-center">
			{headerSlot}
			<div className="grow-1 overflow-hidden flex-y px-ds-16 pt-ds-16 w-[90%]">
				{children}
			</div>
			{footerSlot}
		</div>
	);
};
