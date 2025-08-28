import type { Request } from 'express';
import type { PublicationService } from '@/lib/services/publication/PublicationService';
import type { UserService } from '@/lib/services/user/UserService';
import type { IMailer } from '@/lib/types/ports';
import { logger } from '@/lib/utils/logger';

export class CreatePublicationUseCase {
  // Dependency injection below
  constructor(
    protected publicationService: PublicationService,
    protected userService: UserService,
    // Abstract mailer, could be any mailer but it should implement the Mailer interface
    // Dependency inversion
    protected mailer: IMailer,
  ) {}

  async execute(request: Request) {
    const publication = await this.publicationService.create(request.body);
    const user = await this.userService.getOne(publication.user_id);

    // TODO get all subscribed_users from publication author and send them an email

    this.mailer
      .send({
        to: user.email,
        subject: 'New publication',
        text: `Hi ${user.username}, a new publication has been created`,
      })
      .catch((error) => logger.error(error));

    return publication;
  }
}
