import path from 'path';
import { createReadStream } from 'node:fs';
import { stdout } from 'process';
import { pipeline } from 'stream';
import { EOL } from 'os';

const read = async () => {
  const filePath = path.join(import.meta.dirname, 'files', 'fileToRead.txt');
  const rStream = createReadStream(filePath);

  rStream.on('end', () => stdout.write(EOL));

  pipeline(
    rStream,
    stdout,
    (err) => {
      if (err) console.error(err);
    }
  );
};

await read();