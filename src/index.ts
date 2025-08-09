import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiVersion } from './constants/app';
import { config } from './constants/config';
import { v1 } from './routes/v1';
import { createServer } from './server';

const server = createServer();

server.use(ApiVersion.V1, v1);

server.use('*not-found', (request: Request, response: Response) => {
  console.info('Not found', request.originalUrl);

  response.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
});

server.listen(config.port, () => {
  console.info(`Server listening on port ${config.port}`);
});
