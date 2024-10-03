import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import * as fs from 'fs/promises';

const random = Math.random();

let unknownObject;

const getUnknownObject = async (filename) => {
  const filePath = path.join(import.meta.dirname, 'files', filename);

  return fs.readFile(filePath).then((res) => JSON.parse(res));
}

if (random > 0.5) {
    unknownObject = await getUnknownObject('a.json');
  } else {
    unknownObject = await getUnknownObject('b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.filename}`);
console.log(`Path to current directory is ${import.meta.dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};

