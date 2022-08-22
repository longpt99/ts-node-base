import { AppObject } from '../common/consts';
import { AppEnvironment } from '../common/interfaces';
import { AppConfig } from '../common/interfaces/app-config.interface';
import logger from '../utils/logger.util';
const env = await import('./environments/local.env');

const setupEnvironment = (): AppEnvironment => {
  const mode = process.env.NODE_ENV ?? AppObject.ENVIRONMENTS.LOCAL;
  logger.info(
    `[System] Application loaded using the "${mode}" environment configuration.`
  );
  console.log(env);

  return env.default;
};

export default {
  ENV: setupEnvironment(),
} as AppConfig;
