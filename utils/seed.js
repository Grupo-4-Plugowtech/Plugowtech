import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Populating database...');

  // Crear 5 empresas
  const companies = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.company.create({
        data: {
          name: faker.company.name(),
          email: faker.internet.email(),
          cnpj: faker.string.numeric(14),
        },
      })
    )
  );

  console.log('Companies created:', companies.length);

  // Crear 20 usuarios vinculados a empresas aleatorias
  const users = await Promise.all(
    Array.from({ length: 20 }).map(() => {
      const randomCompany = companies[Math.floor(Math.random() * companies.length)];
      return prisma.user.create({
        data: {
          name: faker.person.firstName(),
          lastname: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          token_password: faker.string.uuid(),
          phone: faker.phone.number(),
          cpf: faker.string.numeric(11),
          city: faker.location.city(),
          birth_date: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
          approved_terms: true,
          role: 'associated',
          companyId: randomCompany.id, // Asigna el usuario a una empresa aleatoria
        },
      });
    })
  );

  console.log('Users created:', users.length);
}

main()
  .catch((e) => console.error('Error:', e))
  .finally(async () => {
    await prisma.$disconnect();
  });
