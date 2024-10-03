const parseArgs = () => {
  const args = process.argv;
  const res = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--') && !args[i + 1].startsWith('--')) {
      res.push(`${args[i].slice(2)} is ${args[i + 1]}`);
      i++;
    }
  }

  console.log(res.join(', '));
};

parseArgs();