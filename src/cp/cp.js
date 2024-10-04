import { spawn } from 'node:child_process';
import path from 'path';
import { stdin, stdout } from 'node:process';

const spawnChildProcess = async (args = []) => {
  const scriptPath = path.resolve(import.meta.dirname, 'files', 'script.js');
  const childProcess = spawn('node', [scriptPath, ...args]);

  stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(stdout);

  childProcess.on('error', (err) => {
    console.error(`Some error occured: ${err}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
