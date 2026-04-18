import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.farmer.count()
  .then(count => console.log('Successfully connected to DB! Farmers count:', count))
  .catch(err => console.error('Database connection error:', err))
  .finally(() => prisma.$disconnect());
