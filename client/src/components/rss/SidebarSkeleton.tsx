export const SidebarSkeleton = () => {
	return (
		<div className="flex-1 flex-x gap-4 max-h-full min-h-0">
			<div className="w-[15%] hidden lg:block">
				<div className="animate-pulse bg-gray-200 h-32 rounded"></div>
			</div>
			<div className="flex-1 lg:w-[70%] flex-y max-h-full min-h-0 overflow-hidden">
				<div className="flex-1 overflow-y-auto max-h-full min-h-0 pt-ds-24 px-ds-16">
					<div className="flex-x flex-wrap items-stretch gap-6 justify-center">
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className="w-[30%] bg-card border rounded-xl p-6"
							>
								<div className="flex justify-between items-center mb-4">
									<div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
									<div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
								</div>
								<div className="animate-pulse bg-gray-200 h-6 w-full mb-4 rounded"></div>
								<div className="space-y-2">
									<div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
									<div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded"></div>
									<div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="w-[15%] hidden lg:block">
				<div className="animate-pulse bg-gray-200 h-32 rounded"></div>
			</div>
		</div>
	);
};
