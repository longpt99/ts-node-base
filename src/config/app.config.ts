import path from 'path';
import { AppEnvironment } from '../common/interfaces';
import { AppConfig } from '../common/interfaces/app-config.interface';

const setupEnvironment = (): AppEnvironment => {
  const mode = process.env.NODE_ENV || 'production';
  return require(`./environments/${mode}.env`).ENV as AppEnvironment;
};

export default {
  ROOT: path.normalize(__dirname + '../'),
  ENV: setupEnvironment(),
} as AppConfig;
