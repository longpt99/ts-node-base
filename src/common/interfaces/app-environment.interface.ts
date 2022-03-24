export interface AppEnvironment {
  NAME: string;
  APP: {
    PORT: number;
  };
  SECURE: {
    PASSWORD_SECRET_KEY: string;
    JWT_ACCESS_TOKEN: {
      SECRET_KEY: string;
      EXPIRED_TIME: number;
    };
    JWT_REFRESH_TOKEN: {
      SECRET_KEY: string;
      EXPIRED_TIME: number;
    };
  };
  DATABASE: {
    MONGODB: {
      USERNAME: string;
      PASSWORD: string;
      HOST: string;
      PORT: number;
      NAME: string;
    };
    POSTGRES: {
      USERNAME: string;
      PASSWORD: string;
      HOST: string;
      PORT: number;
      NAME: string;
    };
    REDIS?: {
      HOST: string;
      PORT: number;
      PASSWORD: string;
      DB: number;
      KEY_PREFIX: string;
    };
  };
  OAUTH2: {
    [key: string]: {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
    };
  };
}
