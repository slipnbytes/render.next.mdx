const { promises } = require('fs');
const { join, resolve } = require('path');

const { checkPath } = require('./checkPath');

const ROOT_DIR = resolve(__dirname, '..');
const DIST_DIR = resolve(ROOT_DIR, 'dist');
const TYPINGS_DIR = resolve(ROOT_DIR, 'typings');

async function run() {
  const files = await promises.readdir(DIST_DIR);

  await Promise.all(
    files.map(async file => {
      const fileRootPath = join(ROOT_DIR, file);
      const pathExists = await checkPath(fileRootPath);

      if (pathExists) {
        await promises.unlink(fileRootPath);
      }

      return true;
    }),
  );

  const typings = await promises.readdir(TYPINGS_DIR);

  await Promise.all(
    typings.map(async file => {
      const fileRootPath = join(ROOT_DIR, file);
      const pathExists = await checkPath(fileRootPath);

      if (pathExists) {
        await promises.unlink(fileRootPath);
      }

      return true;
    }),
  );
}

run();
