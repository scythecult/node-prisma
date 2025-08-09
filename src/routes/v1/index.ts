import { Router } from 'express';
import { AppRoute } from '../../constants/app';
import { comments } from './comments';
import { publications } from './publications';
import { users } from './users';

const v1 = Router();

v1.use(AppRoute.USERS, users);
v1.use(AppRoute.PUBLICATIONS, publications);
v1.use(AppRoute.COMMENTS, comments);

export { v1 };
