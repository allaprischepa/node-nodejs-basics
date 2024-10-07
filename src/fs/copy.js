import * as fs from 'fs/promises';
import path from 'path';

const srcPath = path.join(import.meta.dirname, 'files');
const destPath = path.join(import.meta.dirname, 'files_copy');
const cpOptions = {
  errorOnExist: true,
  force: false,
  recursive: true,
};
const ERR_FS_CP_EEXIST = 'ERR_FS_CP_EEXIST';
const ENOENT = 'ENOENT';

const copy = async () => {
  fs.cp(srcPath, destPath, cpOptions)
    .catch((err) => {
      throw ([ERR_FS_CP_EEXIST, ENOENT].includes(err.code)) ? Error('FS operation failed', { cause: err }) : err;
    });
};

await copy();
