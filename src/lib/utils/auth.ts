import bcrypt from 'bcryptjs';
import { jwtVerify, type JWTVerifyResult, SignJWT } from 'jose';
import { config } from '../constants/config';
import type { AuthPayload } from '../types/auth';

export const createJWT = async (id: string) =>
  await new SignJWT({ id })
    .setProtectedHeader({ alg: config.jwtAlgorithm })
    .setIssuedAt()
    .setIssuer(config.jwtIssuer)
    .setAudience(config.jwtAudience)
    .setExpirationTime(config.jwtExpirationTime)
    .sign(config.jwtSecret);

export const verifyJWT = async (token: string): Promise<JWTVerifyResult<AuthPayload>> =>
  await jwtVerify(token, config.jwtSecret, {
    issuer: config.jwtIssuer,
    audience: config.jwtAudience,
    algorithms: [config.jwtAlgorithm],
  });

export const comparePasswords = async (plainPassword: string, hashedPassword: string) =>
  await bcrypt.compare(plainPassword, hashedPassword);

export const hashPassword = async (plainPassword: string) => await bcrypt.hash(plainPassword, config.bCryptSaltRounds);

// console.log(await createJWT('cme9qjbrw0000i0dhbl852gg1'));
