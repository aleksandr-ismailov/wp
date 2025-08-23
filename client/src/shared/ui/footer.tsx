interface FooterProps {
	copyrightText: string;
	authorName: string;
}

export const Footer = (props: FooterProps) => {
	const { copyrightText, authorName } = props;

	return (
		<footer className="bg-card border-t border-border w-full flex-x justify-center items-center shadow-sm">
			<div className="py-6 px-ds-16 grow-1 max-w-[90%]">
				<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
					<div className="text-sm text-muted-foreground">{copyrightText}</div>

					<div className="flex items-center space-x-4 text-sm text-muted-foreground">
						<span>Created by</span>
						<span className="font-medium text-foreground">{authorName}</span>
					</div>
				</div>
			</div>
		</footer>
	);
};
