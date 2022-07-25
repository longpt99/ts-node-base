import { Application } from 'express';
import { Server } from 'http';
import { logger } from '../utils';

export default function (server: Server): void {
  const others = [
    'SIGINT',
    'SIGTERM',
    'uncaughtException',
    'unhandledRejection',
  ];
  others.forEach((eventType) => {
    process.on(eventType, exitRouter.bind(null, { exit: true }));
  });

  function exitRouter(options, exitCode) {
    if (exitCode.stack) {
      logger.error(`[System] ${exitCode.message} ${exitCode.stack}.`);
    } else {
      logger.info(`[System] ExitCode ${exitCode}.`);
    }
    if (options.exit) {
      process.exit();
    }
  }

  function exitHandler(exitCode: number) {
    logger.info(`[System] ExitCode ${exitCode}.`);
    logger.info('[System] Exiting finally.');
  }

  process.on('exit', exitHandler);
}
