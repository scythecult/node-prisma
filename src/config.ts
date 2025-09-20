import { createSecretKey } from 'node:crypto';
import { NODE_ENV, SERVER_PORT } from './lib/constants/app';

export const config = {
  environment: process.env.NODE_ENV ?? NODE_ENV,
  port: process.env.PORT ?? SERVER_PORT,
  debug: process.env.APP_DEBUG === 'true',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  bCryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS ? Number(process.env.BCRYPT_SALT_ROUNDS) : 10,
  jwtAlgorithm: process.env.JWT_ALGORITHM ?? '',
  jwtAudience: process.env.JWT_AUDIENCE ?? '',
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
  jwtIssuer: process.env.JWT_ISSUER ?? '',
  jwtSecret: createSecretKey(process.env.JWT_SECRET, 'utf-8'),
  mail: {
    mailer: process.env.MAIL_MAILER ?? 'smtp',
    host: process.env.MAIL_HOST ?? '',
    port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 0,
    username: process.env.MAIL_USERNAME ?? '',
    password: process.env.MAIL_PASSWORD ?? '',
  },
  adminEmail: process.env.ADMIN_EMAIL ?? '',
  consoleLogEmails: process.env.CONSOLE_LOG_EMAILS === 'true',
};
