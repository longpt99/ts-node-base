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
      EXPIRED_TIME: 24 * 60 * 60,
      SECRET_KEY: 'local-access-token#123456a@A',
    },
    JWT_REFRESH_TOKEN: {
      EXPIRED_TIME: 10 * 24 * 60 * 60,
      SECRET_KEY: 'local-refresh-token#123456a@A',
    },
  },
  DATABASE: {
    POSTGRES: {
      USERNAME: 'postgres',
      PASSWORD: 'postgres',
      HOST: 'localhost',
      PORT: 5432,
      NAME: 'postgres',
      // USERNAME: 'postgres',
      // PASSWORD: 'postgres@123',
      // HOST: 'db.lbzallnzxudagdmrjtru.supabase.co',
      // PORT: 5432,
      // NAME: 'postgres',
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
        '1094050979580-lopmm47mdpllck2lsk8nb0ro7jo851jg.apps.googleusercontent.com',
      CLIENT_SECRET: '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',
    },
    FACEBOOK: {
      CLIENT_ID: '2959728634319670',
      CLIENT_SECRET: '1aac188502dffc783a16d7b16e353a13',
    },
  },
  MAIL_CONFIG: {
    SMTP_CONFIG: {
      HOST: 'smtp.gmail.com',
      PORT: 465,
      SECURE: true,
      AUTH: {
        USER: 'longpt99.it@gmail.com',
        PASS: 'fvjgkfykxpdiienx',
      },
    },
  },
};
