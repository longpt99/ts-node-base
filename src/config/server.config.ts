import { green } from 'chalk';
import { success } from 'signale';

export default function (): void {
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
    console.log(exitCode);

    if (exitCode ?? exitCode === 0) {
      success(green(`ExitCode ${exitCode}.`));
    }
    if (options.exit) process.exit();
  }

  function exitHandler(exitCode: number) {
    success(green(`ExitCode ${exitCode}.`));
    success(green('Exiting finally.'));
  }

  process.on('exit', exitHandler);
}
