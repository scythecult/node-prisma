import z from 'zod';

export const createCommentSchema = z.strictObject({
  user_id: z.string({ error: 'User ID must be a valid UUID' }),
  publication_id: z.string({ error: 'Publication ID must be a valid UUID' }),
  message: z
    .string({ error: 'Message must be a string' })
    .min(1, { error: 'Message must be minimum 1 character' })
    .max(60, {
      error: 'Message must be maximum 60 characters',
    }),
});
