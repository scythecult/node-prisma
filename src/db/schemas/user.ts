import z from 'zod';

export const noteSchema = z.strictObject({
  // user_id: z.string({ error: 'User ID must be a valid UUID' }),
  message: z
    .string({ error: 'Message must be a string' })
    .min(1, { error: 'Message must be minimum 1 character' })
    .max(60, {
      error: 'Message must be maximum 60 characters',
    }),
  auditory: z.literal(['friends', 'subscribed'], { error: 'Auditory must be "friends" or "subscribed"' }),
});

export const createUserSchema = z.strictObject({
  email: z.email({ error: 'Email must be a valid email address' }),
  username: z
    .string({ error: 'Username must be a string' })
    .min(1, { error: 'Username must be minimum 1 character' })
    .max(50, { error: 'Username must be maximum 50 characters' }),
  password: z.string({ error: 'Password must be a string' }).min(1, { error: 'Password must be minimum 1 character' }),
  fullname: z.string({ error: 'Fullname must be a string' }).min(1, { error: 'Fullname must be minimum 1 character' }),
  birthdate: z.iso.datetime({ error: 'Birthdate must be a date' }),
  avatar_url: z.url({ error: 'Avatar URL must be a valid URL' }),
  note: noteSchema.optional(),
});

export const updateUserSchema = createUserSchema.partial().optional();
