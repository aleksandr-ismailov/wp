'use client';

import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface NewsPaginationProps {
	currentPage: number;
	hasMore: boolean;
	onPageChange: (page: number) => void;
	isLoading: boolean;
}

export const NewsPagination = ({
	currentPage,
	hasMore,
	onPageChange,
	isLoading,
}: NewsPaginationProps) => {
	const generatePageNumbers = () => {
		const pages = [];

		if (currentPage <= 2) {
			for (let i = 1; i <= Math.max(3, currentPage + 1); i++) {
				pages.push(i);
			}
		} else {
			const startPage = currentPage - 1;
			const endPage = currentPage + 1;

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}
		}

		return pages;
	};

	const pageNumbers = generatePageNumbers();
	const showFirstPageWithEllipsis = currentPage > 2;

	return (
		<PaginationContent className="rounded-full border-border border bg-background shadow-xl px-1 py-1 gap-0.5 mx-auto w-fit">
			<PaginationItem>
				<PaginationPrevious
					href="#"
					onClick={(e) => {
						e.preventDefault();
						if (currentPage > 1) {
							onPageChange(currentPage - 1);
						}
					}}
					className={
						currentPage === 1 || isLoading
							? 'pointer-events-none opacity-50'
							: 'cursor-pointer'
					}
				/>
			</PaginationItem>

			{showFirstPageWithEllipsis && (
				<>
					<PaginationItem>
						<PaginationLink
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (!isLoading) {
									onPageChange(1);
								}
							}}
							className={
								isLoading
									? 'pointer-events-none opacity-50'
									: 'cursor-pointer'
							}
						>
							1
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				</>
			)}

			{pageNumbers.map((pageNumber) => (
				<PaginationItem key={pageNumber}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault();
							onPageChange(pageNumber);
						}}
						isActive={pageNumber === currentPage}
						className={
							isLoading && pageNumber !== currentPage
								? 'pointer-events-none opacity-50'
								: 'cursor-pointer'
						}
					>
						{pageNumber}
					</PaginationLink>
				</PaginationItem>
			))}

			{hasMore && currentPage + 1 > Math.max(...pageNumbers) && (
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
			)}

			<PaginationItem>
				<PaginationNext
					href="#"
					onClick={(e) => {
						e.preventDefault();
						if (hasMore) {
							onPageChange(currentPage + 1);
						}
					}}
					className={
						!hasMore || isLoading
							? 'pointer-events-none opacity-50'
							: 'cursor-pointer'
					}
				/>
			</PaginationItem>
		</PaginationContent>
	);
};
