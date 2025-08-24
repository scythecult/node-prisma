import z from 'zod';

export const createPublicationSchema = z.strictObject({
  user_id: z.string({ error: 'User ID must be a valid UUID' }),
  picture_url: z.url({ error: 'Picture URL must be a valid URL' }),
  likes: z.number({ error: 'Likes must be a number' }).min(0, { error: 'Likes must be minimum 0' }),
  is_liked: z.boolean({ error: 'Is liked must be a boolean' }),
  description: z
    .string({ error: 'Description must be a string' })
    .min(1, { error: 'Description must be minimum 1 character' })
    .max(60, {
      error: 'Description must be maximum 60 characters',
    }),
});
