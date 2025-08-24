import { prisma } from '@/db/prisma';
import { UserService } from './UserService';

export const userService = new UserService(prisma);
