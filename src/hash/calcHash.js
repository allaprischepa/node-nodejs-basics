import path from 'path';
import { createReadStream } from 'node:fs';
import { pipeline } from 'stream';
import { stdout } from 'process';
import { EOL } from 'os';
const { createHash } = await import('node:crypto');

const calculateHash = async () => {
  const filePath = path.join(import.meta.dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const rStream = createReadStream(filePath);

  hash.on('end', () => stdout.write(EOL));
  
  pipeline(
    rStream,
    hash.setEncoding('hex'),
    stdout,
    (err) => {
      if (err) console.error(err);
    }
  );
};

await calculateHash();