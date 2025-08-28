import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/utils/auth';

const prisma = new PrismaClient();

const USERS_AMOUNT = 4;

const PUBLICATIONS_AMOUNT = 10;

const COMMENTS_AMOUNT = 10;

const main = async () => {
  // To delete multiple related data we need to add a cascade delete in the correspond model
  await prisma.user.deleteMany();
  await prisma.publication.deleteMany();
  await prisma.comment.deleteMany();

  for (let i = 0; i < USERS_AMOUNT; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.username(),
        password: await hashPassword(faker.internet.password()),
        fullname: faker.person.fullName(),
        birthdate: faker.date.birthdate(),
        avatar_url: faker.image.avatar(),
      },
    });

    for (let j = 0; j < PUBLICATIONS_AMOUNT; j++) {
      const publication = await prisma.publication.create({
        data: {
          user_id: user.id,
          likes: faker.number.int({ min: 0, max: 100 }),
          picture_url: faker.image.url(),
          is_liked: faker.datatype.boolean(),
          description: faker.lorem.sentence(),
        },
      });

      for (let k = 0; k < COMMENTS_AMOUNT; k++) {
        await prisma.comment.create({
          data: {
            user_id: user.id,
            publication_id: publication.id,
            message: faker.lorem.sentence(),
          },
        });
      }
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
