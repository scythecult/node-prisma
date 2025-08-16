import z from 'zod';

export const idParamSchema = z.object({
  id: z.string({ error: 'ID must be a string' }),
});

export type IdParam = z.infer<typeof idParamSchema>;
