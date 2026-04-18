import fs from 'fs';

const files = [
  'app/api/farmers/route.ts',
  'app/api/farmers/[id]/route.ts',
  'app/api/projects/route.ts',
  'app/api/projects/[id]/route.ts',
  'app/farmers/actions.ts',
  'app/projects/actions.ts',
  'app/users/actions.ts'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/const\s+pool\s*=\s*new\s+Pool\(\{ connectionString \}\)[^\n]*\n?/g, '');
  content = content.replace(/const\s+adapter\s*=\s*new\s+PrismaPg\(pool\)[^\n]*\n?/g, '');
  fs.writeFileSync(f, content, 'utf8');
  console.log(`Cleaned ${f}`);
});
