import * as fs from 'fs/promises';
import path from 'path';

const filePath = path.join(import.meta.dirname, 'files', 'fresh.txt');
const content = 'I am fresh and young';
const EEXIST = 'EEXIST'; // Code: File exists

const create = async () => {
  fs.writeFile(filePath, content, { flag: 'wx+' })
    .catch((err) => {
      throw (err.code === EEXIST) ? Error('FS operation failed', { cause: err }) : err;
    });
};

await create();