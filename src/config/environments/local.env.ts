import { IAppEnvironment } from '../../common/interfaces';

export const ENV: IAppEnvironment = {
  NAME: 'local',
  APP: {
    PORT: 8080,
  },
  SECURE: {
    JWT: {
      EXPIRED_TIME: 30 * 60,
      SECRET_KEY: 'local-access-token#123456a@A',
    },
  },
  DATABASE: {
    MONGODB: {
      USERNAME: '',
      PASSWORD: '',
      HOST: 'localhost',
      PORT: 27017,
      NAME: 'ts-node-base',
    },
  },
};
