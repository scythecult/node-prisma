import type { AuthPayload } from './auth';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRATION_TIME: string;
      JWT_ISSUER: string;
      JWT_AUDIENCE: string;
      JWT_ALGORITHM: string;
      BCRYPT_SALT_ROUNDS: string;
      NODE_ENV: string;
      PORT: string;
      APP_DEBUG: string;
      LOG_LEVEL: string;
      MAIL_MAILER: string;
      MAIL_HOST: string;
      MAIL_PORT: string;
      MAIL_USERNAME: string;
      MAIL_PASSWORD: string;
      ADMIN_EMAIL: string;
      CONSOLE_LOG_EMAILS: string;
    }
  }

  namespace Express {
    interface Request {
      auth: {
        payload: AuthPayload;
        token: string;
      };
    }
  }
}
