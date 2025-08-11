import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthenticationError } from '../lib/errors/AuthenticationError';
import { verifyJWT } from '../lib/utils/auth';

export const authenticateUserMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'Authorization header missing or malformed',
      code: 'ERR_AUTH',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { payload } = await verifyJWT(token);

    request.auth = { payload, token };

    next();
  } catch (error) {
    console.error(error);

    throw new AuthenticationError({
      statusCode: StatusCodes.FORBIDDEN,
      message: 'You are not authorized to perform this operation',
      code: 'ERR_AUTH',
    });
  }
};
