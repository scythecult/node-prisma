import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '../lib/constants/config';
import { CustomError } from '../lib/errors/CustomError';
import { getErrorMessage } from '../lib/utils/utils';

export const errorMiddleware = (error: unknown, request: Request, response: Response, next: NextFunction) => {
  if (response.headersSent || config.debug) {
    next(error);

    return;
  }

  if (error instanceof CustomError) {
    response.status(error.statusCode).json({ error: { message: error.message, code: error.code } });

    return;
  }

  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: { message: getErrorMessage(error) || 'Internal server error. Please view logs for more details' } });
};
