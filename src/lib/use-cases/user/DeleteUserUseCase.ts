import type { Request } from 'express';
import type { UserService } from '@/lib/services/user/UserService';
import type { IMailer } from '@/lib/types/ports';
import { logger } from '@/lib/utils/logger';

export class DeleteUserUseCase {
  constructor(protected usersService: UserService, protected mailer: IMailer) {}

  async execute(request: Request) {
    const user = await this.usersService.delete(request.params.id);

    this.mailer
      .send({
        to: user.email,
        subject: 'Farewell message',
        text: `Hi ${user.username}, we're sorry to see you go`,
      })
      .catch((error) => logger.error(error));

    return user;
  }
}
