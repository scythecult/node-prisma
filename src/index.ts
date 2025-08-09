import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from './constants/config';
import { createServer } from './server';

const server = createServer();

server.use('*not-found', (request: Request, response: Response) => {
  console.info('Not found', request.originalUrl);

  response.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
});

server.listen(config.port, () => {
  console.info(`Server listening on port ${config.port}`);
});
