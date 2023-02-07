import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function run() {
  //limpa o prisma
  await prisma.user.deleteMany();
  const promises = [];

  for (let i = 0; i < 50; i++) {
    promises.push(
      prisma.user.create({
        data: {
          name: faker.name.fullName(),
          age: Math.floor(Math.random() * 100),
          city: faker.address.cityName(),
        },
      }),
    );
  }
  await Promise.all(promises);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    console.log(e);
    await prisma.$disconnect();
  });
