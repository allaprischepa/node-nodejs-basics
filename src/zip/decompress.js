import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';

const decompress = async () => {
  const sourcePath = path.join(import.meta.dirname, 'files', 'archive.gz');
  const destPath = path.join(import.meta.dirname, 'files', 'fileToCompress.txt');
  const unzip = createUnzip();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destPath);

  pipeline(
    source,
    unzip,
    destination,
    (err) => {
      if (err) {
        console.error(err);
        process.exitCode = 1;
      }
    }
  );
};

await decompress();