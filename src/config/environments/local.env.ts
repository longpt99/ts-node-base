import { AppEnvironment } from '../../common/interfaces';

export const ENV: AppEnvironment = {
  NAME: 'local',
  APP: {
    PORT: 8080,
  },
  SECURE: {
    PASSWORD_SECRET_KEY: 'passwordsecretkey#123456a@A',
    JWT_ACCESS_TOKEN: {
      EXPIRED_TIME: 30 * 60,
      SECRET_KEY: 'local-access-token#123456a@A',
    },
    JWT_REFRESH_TOKEN: {
      EXPIRED_TIME: 30 * 60,
      SECRET_KEY: 'local-refresh-token#123456a@A',
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
    POSTGRES: {
      USERNAME: 'postgres',
      PASSWORD: 'postgres',
      HOST: 'localhost',
      PORT: 5432,
      NAME: 'postgres',
    },
  },
  OAUTH2: {
    GOOGLE: {
      CLIENT_ID:
        '873379095237-sq8rsuemift9rl903frqmn82gr2q4l22.apps.googleusercontent.com',
      CLIENT_SECRET: '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',
    },
    FACEBOOK: {
      CLIENT_ID:
        '873379095237-sq8rsuemift9rl903frqmn82gr2q4l22.apps.googleusercontent.com',
      CLIENT_SECRET: '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',
    },
  },
};
