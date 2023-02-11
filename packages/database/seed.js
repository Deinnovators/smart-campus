/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const createRandomUser = () => {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName(sex);
  const name = firstName + ' ' + lastName;
  return {
    name,
    sex,
    password: '$2b$10$Ptt2c9nz.cAgxKCFl32Qa.T/wPuak5grXOSH9QoegvZ0LSA28SBs6',
    avatar: faker.internet.avatar(),
    email: faker.helpers
      .unique(faker.internet.email, [firstName, lastName, 'hstu.ac.bd'])
      .toLowerCase(),
    dateOfBirth: faker.date.birthdate(),
  };
};

const createStudent = () => {
  return {
    uid: faker.datatype.uuid(),
    ...createRandomUser(),
  };
};

const superAdmin = {
  uid: 'hstusuperadmin',
  name: 'Super Admin',
  sex: 'male',
  password: '$2b$10$Ptt2c9nz.cAgxKCFl32Qa.T/wPuak5grXOSH9QoegvZ0LSA28SBs6',
  avatar: faker.internet.avatar(),
  email: 'super@hstu.ac.bd',
  dateOfBirth: faker.date.birthdate(),
  role: 'superadmin',
};
const createTeacher = () => {
  return {
    uid: faker.datatype.uuid(),
    role: 'teacher',
    ...createRandomUser(),
  };
};

const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: 'super@hstu.ac.bd' },
    update: {},
    create: superAdmin,
  });

  for (let i = 0; i < 100; i++) {
    const user = createStudent();
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    console.log(createdUser);
  }
  for (let i = 0; i < 20; i++) {
    const user = createTeacher();
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    console.log(createdUser);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
