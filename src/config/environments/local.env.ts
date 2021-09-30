import { IAppEnvironment } from '../../common/interfaces';

export const ENV: IAppEnvironment = {
  NAME: 'local',
  APP: {
    PORT: 8080,
  },
  SECURE: {
    TOKEN: {
      EXPIRED_TIME: 1500,
      SECRET_KEY: 'local#123456a@A',
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
