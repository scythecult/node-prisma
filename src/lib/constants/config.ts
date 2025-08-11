import { createSecretKey } from 'node:crypto';
import { NODE_ENV, SERVER_PORT } from './app';

export const config = {
  environment: process.env.NODE_ENV ?? NODE_ENV,
  port: process.env.PORT ?? SERVER_PORT,
  debug: process.env.APP_DEBUG === 'true',
  bCryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS ? Number(process.env.BCRYPT_SALT_ROUNDS) : 10,
  jwtAlgorithm: process.env.JWT_ALGORITHM ?? '',
  jwtAudience: process.env.JWT_AUDIENCE ?? '',
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME ?? '',
  jwtIssuer: process.env.JWT_ISSUER ?? '',
  jwtSecret: createSecretKey(process.env.JWT_SECRET, 'utf-8') ?? '',
};
