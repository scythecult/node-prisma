import type { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRATION_TIME: string;
      JWT_ISSUER: string;
      JWT_AUDIENCE: string;
      JWT_ALGORITHM: string;
      BCRYPT_SALT_ROUNDS: number;
      NODE_ENV: string;
      PORT: number;
      APP_DEBUG: string;
      LOG_LEVEL: error | warning | info | http | debug;
    }
  }

  namespace Express {
    interface Request {
      auth: {
        payload: JwtPayload;
        token: string;
      };
    }
  }
}
