import bcrypt from 'bcryptjs';
import { type JWTPayload, jwtVerify, type JWTVerifyResult, SignJWT } from 'jose';
import { config } from '../constants/config';

export const createJWT = async (id: string) =>
  await new SignJWT({ id })
    .setProtectedHeader({ alg: config.jwtAlgorithm })
    .setIssuedAt()
    .setIssuer(config.jwtIssuer)
    .setAudience(config.jwtAudience)
    .setExpirationTime(config.jwtExpirationTime)
    .sign(config.jwtSecret);

export const verifyJWT = async <T extends JWTPayload>(token: string): Promise<JWTVerifyResult<T>> =>
  await jwtVerify(token, config.jwtSecret, {
    issuer: config.jwtIssuer,
    audience: config.jwtAudience,
    algorithms: [config.jwtAlgorithm],
  });

export const comparePasswords = async (plainPassword: string, hashedPassword: string) =>
  await bcrypt.compare(plainPassword, hashedPassword);

export const hashPassword = async (plainPassword: string) => await bcrypt.hash(plainPassword, config.bCryptSaltRounds);
