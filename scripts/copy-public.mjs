import path from 'path';
import fs from 'fs/promises';

const SOURCE_DIR = path.resolve(process.cwd(), 'public');
const TARGET_DIR = path.resolve(process.cwd(), 'dist');

async function copyDirectory(source, target) {
  await fs.mkdir(target, { recursive: true });
  const entries = await fs.readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  await fs.rm(TARGET_DIR, { recursive: true, force: true });
  await copyDirectory(SOURCE_DIR, TARGET_DIR);
}

main().catch((error) => {
  console.error('Failed to copy public assets:', error);
  process.exitCode = 1;
});
