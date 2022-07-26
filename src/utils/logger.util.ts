import { green, red } from 'chalk';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const transport: DailyRotateFile = new DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  // maxSize: '20m',
  maxFiles: '30d',
  level: 'error',
});

const formatOptions = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.metadata({
    fillExcept: ['message', 'level', 'timestamp', 'label'],
  }),
  format.printf((info) => {
    const level = info.level.toUpperCase();
    let msg = `[${info.timestamp}][${level}]: ${info.message}`;

    if (Object.keys(info.metadata).length > 0) {
      msg += ` ${JSON.stringify(info.metadata)}`;
    }

    switch (level) {
      case 'INFO':
        msg = green(msg);
        break;
      case 'WARN':
        break;
      case 'ERROR':
        msg = red(msg);
        break;
      case 'DEBUG':
        break;
      default:
        break;
    }

    return msg;
  })
);

export default createLogger({
  transports: [transport, new transports.Console({ format: formatOptions })],
});
