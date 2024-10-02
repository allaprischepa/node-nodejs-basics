import * as fs from 'fs/promises';
import path from 'path';

const oldPath = path.join(import.meta.dirname, 'files', 'wrongFilename.txt');
const newPath = path.join(import.meta.dirname, 'files', 'properFilename.md');

const rename = async () => {
  try {
    const oldPathAccess = await fs.access(oldPath, fs.constants.F_OK).catch((err) => { return err });
    const newPathAccess = await fs.access(newPath, fs.constants.F_OK).catch((err) => { return err });

    if (oldPathAccess instanceof Error) throw oldPathAccess;
    if (!(newPathAccess instanceof Error)) throw Error(`File ${newPath} already exists`);

    fs.rename(oldPath, newPath);
  } catch(err) {
    throw Error('FS operation failed', { cause: err });
  }
};

await rename();