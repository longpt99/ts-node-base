import { AppEnvironment } from '../../common/interfaces';

export const ENV: AppEnvironment = {
  NAME: 'local',
  APP: {
    PORT: 8080,
  },
  SECURE: {
    COOKIE_SECRET_KEY: 'local-cookie#123456a@A',
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
    POSTGRES: {
      USERNAME: 'postgres',
      PASSWORD: 'postgres@123',
      HOST: 'db.lbzallnzxudagdmrjtru.supabase.co',
      PORT: 5432,
      NAME: 'postgres',
    },
    REDIS: {
      HOST: 'redis-12778.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
      PORT: 12778,
      PASSWORD: 'mjqobYRnaOkgaa3HS9d4SrNiDsKrlbNO',
      DATABASE: 0,
      // HOST: 'localhost',
      // PORT: 6379,
      // PASSWORD: '',
      // DATABASE: 0,
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
