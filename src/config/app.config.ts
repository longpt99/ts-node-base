import { IAppEnvironment } from '../common/interfaces';

const appConfig = (): IAppEnvironment => {
  const mode = process.env.NODE_ENV || 'production';
  return require(`./environments/${mode}.env`).ENV as IAppEnvironment;
};

export default appConfig();
