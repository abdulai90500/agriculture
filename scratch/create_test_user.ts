import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:096245@localhost:5432/agriculture";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "user@example.com";
  const passwordStr = "user123";
  const hash = await bcrypt.hash(passwordStr, 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });
  
  if (existingUser) {
    await prisma.user.update({
      where: { email },
      data: { password: hash }
    });
    console.log(`Updated existing user ${email} with password ${passwordStr}`);
  } else {
    await prisma.user.create({
      data: {
        email,
        name: "Test User",
        role: "user",
        password: hash
      }
    });
    console.log(`Created new user ${email} with password ${passwordStr}`);
  }
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect();
    pool.end();
  });
