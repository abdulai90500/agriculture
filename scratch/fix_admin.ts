import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:096245@localhost:5432/agriculture";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const hash = await bcrypt.hash("admin123", 10);
    
    // Check if any admins exist
    const admins = await prisma.user.findMany({ where: { role: 'admin' } });
    
    if (admins.length > 0) {
      await prisma.user.updateMany({
        where: { role: 'admin' },
        data: { password: hash }
      });
      console.log(`Successfully assigned password 'admin123' to ${admins.length} existing admin accounts.`);
      admins.forEach(a => console.log(`- ${a.email}`));
    } else {
      const newAdmin = await prisma.user.create({
        data: {
          email: "admin@admin.com",
          name: "System Admin",
          role: "admin",
          password: hash
        }
      });
      console.log(`Created new default admin: admin@admin.com / admin123`);
    }
  } catch (error) {
    console.error("Error setting up admin account:", error);
  } finally {
    await prisma.$disconnect();
    pool.end();
  }
}

main();
