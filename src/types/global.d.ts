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
    }
  }

  namespace Express {
    /**
     * Additional vendor fields in express.Request.
     */
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
