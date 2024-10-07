import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';

const compress = async () => {
  const sourcePath = path.join(import.meta.dirname, 'files', 'fileToCompress.txt');
  const destPath = path.join(import.meta.dirname, 'files', 'archive.gz');
  const source = createReadStream(sourcePath);

  source.on('error', (err) => {
    console.error('Compress operation failed:', err);
    process.exitCode = 1;
  });

  source.on('open', () => {
    const destination = createWriteStream(destPath);
    const gzip = createGzip();

    pipeline(
      source,
      gzip,
      destination,
      (err) => {
        if (err) {
          console.error('Compress operation failed:', err);
          process.exitCode = 1;
        }
      }
    );
  });
};

await compress();