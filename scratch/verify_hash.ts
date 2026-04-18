import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:096245@localhost:5432/agriculture";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verify() {
  const user = await prisma.user.findUnique({ where: { email: "admin@mne-agriculture.com" }});
  if (!user) {
    console.log("User not found!");
    return;
  }
  console.log("User found:", user.email);
  const v = await bcrypt.compare("admin123", user.password!);
  console.log("Password verify with admin123:", v);
  await prisma.$disconnect();
  pool.end();
}
verify();
