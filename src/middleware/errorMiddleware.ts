import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { config } from '../config';
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

  if (error instanceof ZodError) {
    const errorMessages = error.issues.map((issue) => issue.message);

    response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: { message: 'Validation error', errors: errorMessages, code: 'ERR_VALID' } });

    return;
  }

  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: { message: getErrorMessage(error) || 'Internal server error. Please view logs for more details' } });
};
