import path from 'path';
import { createReadStream } from 'node:fs';
const { createHash } = await import('node:crypto');

const calculateHash = async () => {
  const filePath = path.join(import.meta.dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  stream.on('error', (err) => console.error(err));
  stream.on('data', (chunk) => hash.update(chunk));
  stream.on('end', () => console.log(hash.digest('hex')));
};

await calculateHash();