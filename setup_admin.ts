import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@meharstare.com';
  const password = await bcrypt.hash('Admin@1234', 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email,
        password,
        role: 'ADMIN'
      }
    });
    console.log('Admin account created successfully.');
  } else {
    // Make sure role and password are correct
    await prisma.user.update({
      where: { email },
      data: {
        password,
        role: 'ADMIN'
      }
    });
    console.log('Admin account already exists, password and role updated.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
