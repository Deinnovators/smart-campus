/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const { districts, divisions, unions, upazillas } = require('bd-geojs');

const password = '$2b$10$y5BbyfeOzbJO/LmXgBQxbud8PlEv6jncXQwsqwHG4ONn2ZOmQaWvi'; // admin123

const rowCount = 2;

const getRandomNumber = max => faker.datatype.number({ max, min: 0 });

const getRandomBDAddress = () => {
  const division = divisions[getRandomNumber(divisions.length - 1)];
  const filteredDistrict = districts.filter(d => d.division_id === division.id);
  const district =
    filteredDistrict[getRandomNumber(filteredDistrict.length - 1)];
  const filteredUpazilla = upazillas.filter(u => u.district_id === district.id);
  const upazilla =
    filteredUpazilla[getRandomNumber(filteredUpazilla.length - 1)];
  const filteredUnion = unions.filter(up => up.upazilla_id === upazilla.id);
  const union = filteredUnion[getRandomNumber(filteredUnion.length - 1)];

  return {
    village: union.name,
    union: union.name,
    upazilla: upazilla.name,
    district: district.name,
    division: division.name,
    zip: +faker.random.numeric(4),
  };
};

const createMyAccount = role => ({
  uid: `sayeed_${role}`,
  name: 'Sayeed Afridi',
  email: `sayeed@${role}.com`,
  sex: 'male',
  password,
  avatar: faker.internet.avatar(),
  dateOfBirth: faker.date.birthdate(),
  role,
  mobile: '01722351346',
  address: {
    create: {
      village: 'Gobindapur',
      division: 'Rangpur',
      district: 'Dinajpur',
      zip: 5230,
      union: 'Alokjhari',
      upazilla: 'Khansama',
    },
  },
});

const getRandomBDMobileNumber = () => faker.phone.number('017########');

const getRandomForeignAddress = () => {
  const country = faker.address.country();
  const state = faker.address.state();
  const city = faker.address.city();
  const street = faker.address.streetAddress();
  const zip = faker.address.zipCodeByState(state);
  const mobile = faker.phone.number('+## 9# ### ## ##');

  return { street, city, state, country, mobile, zip };
};

const createRandomUser = () => {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName(sex);
  const name = firstName + ' ' + lastName;
  return {
    name,
    sex,
    password,
    avatar: faker.internet.avatar(),
    email: faker.helpers
      .unique(faker.internet.email, [firstName, lastName, 'hstu.ac.bd'])
      .toLowerCase(),
    dateOfBirth: faker.date.birthdate(),
    mobile: getRandomBDMobileNumber(),
  };
};

const createBDStudent = () => {
  return {
    uid: faker.datatype.uuid(),
    ...createRandomUser(),
    address: {
      create: getRandomBDAddress(),
    },
  };
};

const createForeignStudent = () => {
  const foreignAddress = getRandomForeignAddress();
  return {
    uid: faker.datatype.uuid(),
    ...createRandomUser(),
    nationality: foreignAddress.country,
    nationalityType: 'foreign',
    foreignAddress: {
      create: foreignAddress,
    },
  };
};

const superAdmin = {
  uid: 'hstusuperadmin',
  name: 'Super Admin',
  sex: 'male',
  password,
  avatar: faker.internet.avatar(),
  email: 'superadmin@hstu.ac.bd',
  dateOfBirth: faker.date.birthdate(),
  role: 'superadmin',
  mobile: getRandomBDMobileNumber(),
  address: {
    create: {
      village: 'Basher Hat',
      division: 'Rangpur',
      district: 'Dinajpur',
      zip: 5200,
      union: 'Basher Hat',
      upazilla: 'Dinajpur Sadar',
    },
  },
};

const admin = {
  uid: 'hstuadmin',
  name: 'Admin',
  sex: 'male',
  password,
  avatar: faker.internet.avatar(),
  email: 'admin@hstu.ac.bd',
  dateOfBirth: faker.date.birthdate(),
  role: 'admin',
  mobile: faker.phone.number('017########'),
  address: {
    create: getRandomBDAddress(),
  },
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
  await createMyAccounts();
  console.log('creating admin & superadmin');
  await prisma.user.upsert({
    where: { email: superAdmin.email },
    update: {},
    create: superAdmin,
  });
  await prisma.user.upsert({
    where: { email: admin.email },
    update: {},
    create: admin,
  });

  console.log('creating bangladeshi student');
  for (let i = 0; i < rowCount; i++) {
    const user = createBDStudent();
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
      include: {
        address: true,
        foreignAddress: true,
      },
    });
  }

  console.log('creating foreign students...');
  for (let i = 0; i < rowCount; i++) {
    const user = createForeignStudent();
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
      include: {
        address: true,
        foreignAddress: true,
      },
    });
  }

  console.log('creating teachers...');
  for (let i = 0; i < rowCount; i++) {
    const user = createTeacher();
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('creating modules...');
  await createModules();
}

const createMyAccounts = async () => {
  console.log('creating my account...');
  await prisma.user.upsert({
    where: { email: 'sayeed@superadmin.com' },
    update: {},
    create: createMyAccount('superadmin'),
  });
  await prisma.user.upsert({
    where: { email: 'sayeed@admin.com' },
    update: {},
    create: createMyAccount('admin'),
  });
  await prisma.user.upsert({
    where: { email: 'sayeed@student.com' },
    update: {},
    create: createMyAccount('student'),
  });
  await prisma.user.upsert({
    where: { email: 'sayeed@alumni.com' },
    update: {},
    create: createMyAccount('alumni'),
  });
  await prisma.user.upsert({
    where: { email: 'sayeed@stuff.com' },
    update: {},
    create: createMyAccount('stuff'),
  });
  await prisma.user.upsert({
    where: { email: 'sayeed@beneficiary.com' },
    update: {},
    create: createMyAccount('beneficiary'),
  });
  await prisma.user.upsert({
    where: { email: 'sayeed@teacher.com' },
    update: {},
    create: createMyAccount('teacher'),
  });
};

const createModules = async () => {
  await prisma.moduleRegistry.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Modules Registry',
      icon: 'modules.webp',
      url: '/modules-registry',
      accessToRoles: ['superadmin', 'admin'],
      parentUrl: null,
    },
  });
  await prisma.moduleRegistry.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Users',
      icon: 'users.webp',
      url: '/users',
      accessToRoles: ['superadmin', 'admin'],
      parentUrl: null,
    },
  });
  await prisma.moduleRegistry.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Transports',
      icon: 'transports.webp',
      url: '/transports',
      accessToRoles: [
        'superadmin',
        'admin',
        'student',
        'stuff',
        'teacher',
        'alumni',
      ],
      parentUrl: null,
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
