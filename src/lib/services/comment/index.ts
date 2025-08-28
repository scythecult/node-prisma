import { prisma } from '@/db/prisma';
import { CommentService } from './CommentService';

export const commentService = new CommentService(prisma);
