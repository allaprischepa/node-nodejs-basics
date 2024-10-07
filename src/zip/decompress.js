import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';

const decompress = async () => {
  const sourcePath = path.join(import.meta.dirname, 'files', 'archive.gz');
  const destPath = path.join(import.meta.dirname, 'files', 'fileToCompress.txt');
  const source = createReadStream(sourcePath);

  source.on('error', (err) => {
    console.error('Decompress operation failed:', err);
    process.exitCode = 1;
  });

  source.on('open', () => {
    const destination = createWriteStream(destPath);
    const unzip = createUnzip();

    pipeline(
      source,
      unzip,
      destination,
      (err) => {
        if (err) {
          console.error('Decompress operation failed:', err);
          process.exitCode = 1;
        }
      }
    );
  });
};

await decompress();