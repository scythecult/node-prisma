import { type Application } from 'express';
import express from 'express';
import { SERVER_PORT } from '@/lib/constants/app';

export const createMockServer = (setupMiddleware?: (app: Application) => void, port = SERVER_PORT) => {
  const app = express();

  if (typeof setupMiddleware === 'function') {
    setupMiddleware(app);
  }

  return app.listen(port);
};
