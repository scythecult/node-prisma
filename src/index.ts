import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, type Request, type Response, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import { ApiVersion, App, AppRoute } from './constants/app';
import { v1 } from './routes/v1';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded());
app.use(cookieParser());
app.use(morgan('dev'));

app.get(AppRoute.ROOT, async (request: Request, response: Response) => {
  response.status(StatusCodes.OK).json({ message: 'OK' });
});

app.use(ApiVersion.V1, v1);

app.use('*not-found', (request: Request, response: Response) => {
  console.info('Not found', request.originalUrl);

  response.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
});

app.listen(App.GATEWAY_PORT, () => {
  console.info(`Server listening on port ${App.GATEWAY_PORT}`);
});
