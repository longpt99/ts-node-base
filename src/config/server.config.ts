export default function () {
  const others = [
    'SIGINT',
    'SIGUSR1',
    'SIGUSR2',
    'uncaughtException',
    'SIGTERM',
  ];
  others.forEach((eventType) => {
    process.on(eventType, exitRouter.bind(null, { exit: true }));
  });

  function exitRouter(options, exitCode) {
    if (exitCode ?? exitCode === 0) {
      console.log(`ExitCode ${exitCode}.`);
    }
    if (options.exit) process.exit();
  }

  function exitHandler(exitCode: number) {
    console.log(`ExitCode ${exitCode}.`);
    console.log('Exiting finally.');
  }

  process.on('exit', exitHandler);
}
