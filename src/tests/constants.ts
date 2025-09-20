export const TEST_QUERY_LIMIT = { limit: 2, offset: 0 };

export const TEST_DEFAULT_QUERY_LIMIT = { limit: 10, offset: 0 };

export const TEST_USER = {
  id: 'cme9qjbrw0000i0dhbl852gg1',
  user_id: null,
  email: 'Armando_Orn52@hotmail.com',
  username: 'lol kek',
  fullname: 'Randal Kutch',
  birthdate: '1972-10-06T08:34:31.000Z',
  avatar_url: 'http://example.com/picture/zaebis.webp',
  created_at: '2025-08-13T08:55:30.140Z',
  updated_at: '2025-08-16T09:40:54.543Z',
  publications: [],
  subscribed_users: [],
  note: {},
};

export const TEST_USERS = [TEST_USER];

export const TEST_USER_NOTE = {
  message: 'ERR_VAL2223I2D',
  auditory: 'subscribed',
};

export const TEST_PUBLICATION = {
  id: 'cmera1kg90003i0jfbb95of2y',
  user_id: 'cme9qjbrw0000i0dhbl852gg1',
  picture_url: 'http://example.com/picture/check.webp',
  likes: 100500,
  is_liked: false,
  description: 'Hello world100500',
  created_at: '2025-08-25T15:33:38.889Z',
  updated_at: '2025-08-25T15:33:38.889Z',
  comments: [],
};

export const TEST_MAIL_NOTIFICATION = {
  to: 'H8b9a@example.com',
  subject: 'Test Subject',
  text: 'Test Text',
  html: '<p>Test HTML</p>',
};

export const TEST_COMMENT = {
  id: 'cme9qjbtp0070i0dhe5zvp4rn',
  user_id: 'cme9qjbrw0000i0dhbl852gg1',
  publication_id: 'cme9qjbto006yi0dhitxivxyd',
  message: 'Caelestis subito spargo praesentium curiositas verus claro porro officiis aliquam.',
  created_at: '2025-08-13T08:55:30.205Z',
  updated_at: '2025-08-13T08:55:30.205Z',
};

export const TEST_PUBLICATIONS_WITH_COMMENTS = [{ ...TEST_PUBLICATION, comments: TEST_COMMENT }];

export const TEST_USERS_WITH_PUBLICATIONS = [
  { ...TEST_USER, publications: TEST_PUBLICATION, subsctibed_users: [TEST_USER] },
];
