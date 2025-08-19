interface FooterProps {
	copyrightText: string;
	authorName: string;
}

export const Footer = (props: FooterProps) => {
	const { copyrightText, authorName } = props;

	return (
		<footer className="bg-background border-t border-border mt-auto">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
					<div className="text-sm text-muted-foreground">
						{copyrightText}
					</div>

					<div className="flex items-center space-x-4 text-sm text-muted-foreground">
						<span>Created by</span>
						<span className="font-medium text-foreground">
							{authorName}
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};
