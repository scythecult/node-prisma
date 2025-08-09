export const ApiVersion = {
  V1: '/v1',
};

export const AppRoute = {
  ROOT: '/',
  USERS: '/users',
  PUBLICATIONS: '/publications',
  COMMENTS: '/comments',
} as const;

export const App = {
  GATEWAY_PORT: 3000,
} as const;

export const NODE_ENV = 'development';
