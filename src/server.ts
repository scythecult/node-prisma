import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiVersion, AppRoute } from './lib/constants/app';
import { config } from './config';
import { errorMiddleware } from './middleware/errorMiddleware';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { v1 } from './routes/v1';

export const createServer = () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(loggerMiddleware);
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());

  app.get(AppRoute.HEATH, (request, response) => {
    response.status(StatusCodes.OK).json({ ok: true, environment: config.environment });
  });

  app.use(ApiVersion.V1, v1);

  app.use(errorMiddleware);

  return app;
};
