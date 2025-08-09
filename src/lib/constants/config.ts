import { NODE_ENV, SERVER_PORT } from './app';

export const config = {
  environment: process.env.NODE_ENV ?? NODE_ENV,
  port: process.env.PORT ?? SERVER_PORT,
  debug: process.env.APP_DEBUG === 'true',
};
