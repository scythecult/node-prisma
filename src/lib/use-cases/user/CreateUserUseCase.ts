import type { Request } from 'express';
import type { UserService } from '../../services/user/UserService';
import type { IMailer } from '../../types/ports';
import { logger } from '../../utils/logger';

export class CreateUserUseCase {
  constructor(protected usersService: UserService, protected mailer: IMailer) {}

  async execute(request: Request) {
    const user = await this.usersService.create(request.body);

    this.mailer
      .send({
        to: user.email,
        subject: 'Welcome to our platform',
        text: `Hi ${user.username}, welcome to our platform`,
      })
      .catch((error) => logger.error(error));

    return user;
  }
}
