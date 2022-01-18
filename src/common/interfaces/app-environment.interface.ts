export interface IAppEnvironment {
  NAME: string;
  APP: {
    PORT: number;
  };
  SECURE?: {
    JWT: {
      SECRET_KEY: string;
      EXPIRED_TIME: number;
    };
  };
  DATABASE?: {
    MONGODB?: {
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
}
