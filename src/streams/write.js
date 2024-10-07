import path from 'path';
import { createWriteStream } from 'node:fs';
import { stdin, stdout } from 'process';
import { pipeline } from 'stream';

const write = async () => {
  const filePath = path.join(import.meta.dirname, 'files', 'fileToWrite.txt');
  const wStream = createWriteStream(filePath);

  stdout.write('Please, input text:\n');

  pipeline(
    stdin,
    wStream,
    (err) => {
      if (err) console.error(err);
    }
  );
};

await write();