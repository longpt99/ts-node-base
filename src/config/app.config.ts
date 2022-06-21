import { normalize } from 'path';
import { AppEnvironment } from '../common/interfaces';
import { AppConfig } from '../common/interfaces/app-config.interface';

const setupEnvironment = (): AppEnvironment => {
  const mode = process.env.NODE_ENV ?? 'local';
  return require(`./environments/${mode}.env`).ENV;
};

export default {
  ROOT: normalize(__dirname + '../'),
  ENV: setupEnvironment(),
} as AppConfig;
