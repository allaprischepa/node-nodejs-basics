import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';

const compress = async () => {
  const sourcePath = path.join(import.meta.dirname, 'files', 'fileToCompress.txt');
  const destPath = path.join(import.meta.dirname, 'files', 'archive.gz');
  const gzip = createGzip();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destPath);

  pipeline(
    source,
    gzip,
    destination,
    (err) => {
      if (err) {
        console.error(err);
        process.exitCode = 1;
      }
    }
  );
};

await compress();