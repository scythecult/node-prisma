import type { JWTPayload } from 'jose';

export type AuthPayload = JWTPayload & { id: string };
