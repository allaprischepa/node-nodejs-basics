import path from 'path';
import { Worker } from 'worker_threads';
import { cpus } from 'os';

const createWorker = (data) => {
  return new Promise((resolve, reject) => {
    const workerPath = path.join(import.meta.dirname, 'worker.js');
    const worker = new Worker(workerPath, { workerData: data });

    worker.on('message', (data) => resolve({ status: 'resolved', data }));
    worker.on('error', (err) => resolve({ status: 'error', data: null }));
  });
}

const performCalculations = async () => {
  const cpusCount = cpus().length;
  const startN = 10;
  const workers = [];

  for (let i = 0; i < cpusCount; i++) {
    workers.push(createWorker(startN + i));
  }

  const res = await Promise.all(workers);

  console.log(res);
};

await performCalculations();