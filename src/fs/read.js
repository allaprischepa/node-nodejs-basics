import * as fs from 'fs/promises';
import path from 'path';

const filePath = path.join(import.meta.dirname, 'files', 'fileToRead.txt');
const readOptions = {
  encoding: 'utf8',
};

const read = async () => {
  fs.readFile(filePath, readOptions)
    .then((res) => console.log(res))
    .catch((err) => {
      throw Error('FS operation failed', { cause: err });
    });
};

await read();