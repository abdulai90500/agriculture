import fs from 'fs';
import path from 'path';

function walk(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'app'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Remove generic Prisma imports
  content = content.replace(/import\s+{\s*PrismaClient\s*}\s+from\s+["']@prisma\/client["'];?\n?/g, '');
  content = content.replace(/import\s+{\s*PrismaPg\s*}\s+from\s+["']@prisma\/adapter-pg["'];?\n?/g, '');
  content = content.replace(/import\s+{\s*Pool\s*}\s+from\s+["']pg["'];?\n?/g, '');
  
  // Remove instantiation logic
  const instantiationPatterns = [
    /const\s+connectionString\s*=\s*process\.env\.DATABASE_URL\s*\|\|\s*["']postgresql:\/\/postgres:[^"']+["'];?\n?/g,
    /const\s+pool\s*=\s*new\s+Pool\(\{\s*connectionString\s*\}\);\n?/g,
    /const\s+adapter\s*=\s*new\s+PrismaPg\(pool\);\n?/g,
    /const\s+prisma\s*=\s*new\s+PrismaClient\(\{ adapter \}\);?\n?/g,
    /const\s+prisma\s*=\s*new\s+PrismaClient\(\);?\n?/g,
  ];

  for (const pat of instantiationPatterns) {
    content = content.replace(pat, '');
  }

  // Inject standard import if 'prisma' is used but not imported
  if (content !== original) {
     if (content.includes('prisma') && !content.includes('@/lib/prisma')) {
         // Insert after 'use server' or 'use client' or simply at the top
         content = content.replace(/^(["']use (?:server|client)["'];?\n?)/m, '$1\nimport { prisma } from "@/lib/prisma";\n');
         
         // fallback if there's no use server/client
         if (!content.includes('@/lib/prisma')) {
             content = 'import { prisma } from "@/lib/prisma";\n' + content;
         }
     }
     fs.writeFileSync(f, content, 'utf8');
     console.log(`Updated: ${f}`);
  }
});
