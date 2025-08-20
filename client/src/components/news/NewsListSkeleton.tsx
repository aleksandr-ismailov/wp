import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function NewsListSkeleton() {
	return (
		<div className="flex-1 overflow-y-auto max-h-full min-h-0">
			<div className="w-full px-ds-24 py-ds-24 space-y-ds-24">
				{Array.from({ length: 6 }).map((_, i) => (
					<Card key={i} className="w-full">
						<div className="flex flex-col lg:flex-row">
							<div className="lg:w-1/3 xl:w-1/4 p-6 lg:pr-0">
								<Skeleton className="h-48 lg:h-full min-h-[200px] w-full rounded-lg" />
							</div>

							<CardContent className="flex-1">
								<div className="space-y-ds-16">
									<div className="flex items-center justify-between flex-wrap gap-ds-8">
										<Skeleton className="h-7 w-20 rounded-full" />
										<Skeleton className="h-4 w-24 rounded" />
									</div>

									<div className="space-y-ds-12">
										<div className="space-y-ds-6">
											<Skeleton className="h-6 w-full rounded" />
											<Skeleton className="h-6 w-3/4 rounded" />
										</div>

										<div className="space-y-ds-8">
											<Skeleton className="h-4 w-full rounded" />
											<Skeleton className="h-4 w-full rounded" />
											<Skeleton className="h-4 w-2/3 rounded" />
										</div>
									</div>

									<div className="flex items-center justify-between pt-ds-12">
										<Skeleton className="h-4 w-24 rounded" />
										<Skeleton className="h-3 w-16 rounded" />
									</div>
								</div>
							</CardContent>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
