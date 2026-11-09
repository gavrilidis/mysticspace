import { execSync } from 'node:child_process';
import { existsSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = process.cwd();
const outDir = join(rootDir, 'out');

function run(cmd, cwd = rootDir, env = process.env) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit', env });
}

try {
  console.log('1. Сборка статического бандла Next.js для GitHub Pages...');
  run('npx next build', rootDir, {
    ...process.env,
    DEPLOY_GH_PAGES: 'true',
  });

  if (!existsSync(outDir)) {
    throw new Error('Папка out/ не была создана после сборки.');
  }

  console.log('2. Добавление .nojekyll (чтобы GitHub Pages отдавал папку _next/)...');
  writeFileSync(join(outDir, '.nojekyll'), '');

  const remoteUrl = execSync('git config --get remote.origin.url', {
    cwd: rootDir,
    encoding: 'utf8',
  }).trim();

  console.log(`3. Публикация сборки из out/ в ветку gh-pages (${remoteUrl})...`);
  const gitDir = join(outDir, '.git');
  if (existsSync(gitDir)) {
    rmSync(gitDir, { recursive: true, force: true });
  }

  run('git init -b gh-pages', outDir);
  run('git add -A', outDir);
  run('git commit -m "Deploy static build to GitHub Pages"', outDir);
  run(`git push -f "${remoteUrl}" gh-pages`, outDir);

  rmSync(gitDir, { recursive: true, force: true });

  console.log('\n✓ Деплой успешно завершён! Сайт опубликован из ветки gh-pages.');
} catch (error) {
  console.error('\n✕ Ошибка при деплое:', error.message);
  process.exit(1);
}
