import { logger } from '../utils';

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
    if (exitCode ?? exitCode === 0) {
      logger.info(`[System] ExitCode ${exitCode}.`);
    }
    if (options.exit) process.exit();
  }

  function exitHandler(exitCode: number) {
    logger.info(`[System] ExitCode ${exitCode}.`);
    logger.info('[System] Exiting finally.');
  }

  process.on('exit', exitHandler);
}
