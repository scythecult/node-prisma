import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import { AppRoute } from './constants/app';
import { config } from './constants/config';

export const createServer = () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());

  app.get(AppRoute.HEATH, (request, response) => {
    response.status(StatusCodes.OK).json({ ok: true, environment: config.environment });
  });

  return app;
};
