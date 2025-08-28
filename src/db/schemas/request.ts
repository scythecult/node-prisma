import z from 'zod';

export const paramIdSchema = z.object({
  id: z.string({ error: 'ID must be a string' }),
});

export const queryPaginationSchema = z.object({
  limit: z.string({ error: 'Limit must present' }).min(1, { error: 'Limit must be minimum 1' }),
  offset: z.string({ error: 'Offset must present' }).min(1, { error: 'Offset must be minimum 1' }),
});
