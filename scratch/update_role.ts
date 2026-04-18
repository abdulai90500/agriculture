import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:096245@localhost:5432/agriculture";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "user@example.com";

  await prisma.user.update({
    where: { email },
    data: { role: "admin" }
  });
  console.log(`Updated role for ${email} to admin`);
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect();
    pool.end();
  });
