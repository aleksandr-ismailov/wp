import { z } from 'zod';

export const searchParamsSchema = z.object({
	page: z.coerce.number().optional(),
	perPage: z.coerce.number().optional(),
	tags: z.union([z.string(), z.array(z.string())]).optional(),
});

export type ArticleSearchParams = z.infer<typeof searchParamsSchema>;
