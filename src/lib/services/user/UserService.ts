import type { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import type { INote } from '@/db/types/Note';
import type { IPublication } from '@/db/types/Publication';
import type { IUser } from '@/db/types/User';
import { User } from '@/lib/entities/User';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';
import type { QueryLimit } from '@/lib/types/request';

type MapUserProps = IUser & { publications: IPublication[] };

export class UserService {
  #db;
  constructor(db: PrismaClient) {
    this.#db = db;
  }

  mapUser(user: MapUserProps) {
    return {
      id: user.id,
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      birthdate: user.birthdate,
      avatar_url: user.avatar_url,
      publications: user.publications,
    };
  }

  async getAll(options: QueryLimit) {
    const { limit, offset } = options;
    const users = await this.#db.user.findMany({
      take: limit,
      skip: offset,
      include: { publications: true, subscribed_users: true },
      omit: { password: true },
    });

    if (!users.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No users found',
        code: 'ERR_NF',
      });
    }

    return users;
  }

  async getOne(id: string) {
    const user = await this.#db.user.findUnique({
      where: { id },
      include: { publications: true, note: true },
      omit: { password: true },
    });

    if (!user) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No user found',
        code: 'ERR_NF',
      });
    }

    return user;
  }

  async getOneByEmail(email: string) {
    const user = await this.#db.user.findUnique({ where: { email }, omit: { password: true } });

    if (user) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'User already exists',
        code: 'ERR_EXISTS',
      });
    }

    return user;
  }

  async create(data: IUser) {
    const user = new User(data);

    await this.getOneByEmail(user.email);

    await user.hashPassword();

    return await this.#db.user.create({ data: user.getAsDto(), omit: { password: true } });
  }

  async update(id: string, data: IUser) {
    return await this.#db.user.update({ where: { id }, data, omit: { password: true } });
  }

  async updateNote(id: string, data: INote) {
    let note = await this.#db.note.findUnique({ where: { user_id: id } });

    if (!note) {
      note = await this.#db.note.create({ data: { ...data, user_id: id } });
    } else {
      note = await this.#db.note.update({ where: { user_id: id }, data });
    }

    return note;
  }

  async delete(id: string) {
    await this.getOne(id);

    return await this.#db.user.delete({ where: { id } });
  }
}
