import { ReactNode } from 'react';

interface LayoutContainerProps {
	headerSlot?: ReactNode;
	children: ReactNode;
	footerSlot?: ReactNode;
}

export const LayoutContainer = (props: LayoutContainerProps) => {
	const { headerSlot, children, footerSlot } = props;

	return (
		<div className="grow-1 flex-y w-full overflow-hidden items-center">
			{headerSlot}
			<div className="grow-1 flex-y w-[90%] overflow-hidden px-ds-16 pt-ds-16">
				{children}
			</div>
			{footerSlot}
		</div>
	);
};
