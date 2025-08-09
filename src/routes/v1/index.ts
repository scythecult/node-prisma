import { Router } from 'express';
import { AppRoute } from '../../constants/app';
import { users } from './users';
import { publications } from './publications';
import { comments } from './comments';

const v1 = Router();

v1.use(AppRoute.USERS, users);
v1.use(AppRoute.PUBLICATIONS, publications);
v1.use(AppRoute.COMMENTS, comments);

export { v1 };
