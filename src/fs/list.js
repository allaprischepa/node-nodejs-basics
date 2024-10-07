import * as fs from 'fs/promises';
import path from 'path';

const dirPath = path.join(import.meta.dirname, 'files');
const readOptions = {
  recursive: true,
};

const list = async () => {
  fs.readdir(dirPath, readOptions)
    .then((res) => console.log(res))
    .catch((err) => {
      throw Error('FS operation failed', { cause: err });
    });
};

await list();