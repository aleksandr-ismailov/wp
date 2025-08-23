import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/shared/theme/components/pagination';

interface ArticlePaginationProps {
	currentPage: number;
	hasMore: boolean;
}

export const ArticlePagination = (props: ArticlePaginationProps) => {
	const { currentPage, hasMore } = props;

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
		<PaginationContent className="rounded-full border-border border bg-background shadow-xl px-ds-4 py-ds-4 gap-ds-2 mx-auto w-fit">
			<PaginationItem>
				<PaginationPrevious
					href={currentPage > 1 ? `/news?page=${currentPage - 1}` : '#'}
					className={
						currentPage === 1
							? 'pointer-events-none opacity-50'
							: 'cursor-pointer'
					}
				/>
			</PaginationItem>

			{showFirstPageWithEllipsis && (
				<>
					<PaginationItem>
						<PaginationLink href="/news?page=1">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				</>
			)}

			{pageNumbers.map((pageNumber) => (
				<PaginationItem key={pageNumber}>
					<PaginationLink
						href={`/news?page=${pageNumber}`}
						isActive={pageNumber === currentPage}
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
					href={hasMore ? `/news?page=${currentPage + 1}` : '#'}
					className={
						!hasMore ? 'pointer-events-none opacity-50' : 'cursor-pointer'
					}
				/>
			</PaginationItem>
		</PaginationContent>
	);
};
