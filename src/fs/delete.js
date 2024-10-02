import * as fs from 'fs/promises';
import path from 'path';

const filePath = path.join(import.meta.dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
  fs.unlink(filePath)
    .catch((err) => {
      throw Error('FS operation failed', { cause: err });
    })
};

await remove();