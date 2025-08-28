export const SERVER_PORT = 3000;

export const NODE_ENV = 'development';

export const ApiVersion = {
  V1: '/v1',
};

export const AppRoute = {
  ROOT: '/',
  HEATH: '/health',
  USERS: '/users',
  PUBLICATIONS: '/publications',
  COMMENTS: '/comments',
  LIKE: '/like',
  NOTE: '/note',
} as const;

export const AppParams = {
  ID: '/:id',
} as const;
