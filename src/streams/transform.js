import { stdin, stdout } from 'process';
import { pipeline, Transform } from 'stream';

const transform = async () => {
  const tStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().trimEnd().split('').reverse().join('');
      this.push(`${reversedChunk}\n`);
      callback();
    },
  });

  stdout.write('Please, input text to reverse:\n');

  pipeline(
    stdin,
    tStream,
    stdout,
    (err) => {
      if (err) console.error(err);
    }
  );
};

await transform();