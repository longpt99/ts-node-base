import { createClient } from 'redis';
import { createConnection } from 'typeorm';
import { IServer } from '../../common/interfaces/app.interface';
import logger from '../../utils/logger';
import APP_CONFIG from '../app.config';
import databaseConfig from './typeorm.config';

export const client = createClient({
  host: APP_CONFIG.ENV.DATABASE.REDIS.HOST,
  port: APP_CONFIG.ENV.DATABASE.REDIS.PORT,
  password: APP_CONFIG.ENV.DATABASE.REDIS.PASSWORD,
  db: APP_CONFIG.ENV.DATABASE.REDIS.DATABASE,
});

// function connectMongoDB() {
//   // const connectionUri = `mongodb://${APP_CONFIG.ENV.DATABASE.MONGODB.USERNAME}:${APP_CONFIG.ENV.DATABASE.MONGODB.PASSWORD}@${APP_CONFIG.ENV.DATABASE.MONGODB.HOST}:${APP_CONFIG.ENV.DATABASE.MONGODB.PORT}/${APP_CONFIG.ENV.DATABASE.MONGODB.NAME}`;
//   // const connectionUri = `mongodb://${APP_CONFIG.ENV.DATABASE.MONGODB.HOST}
//   // :${APP_CONFIG.ENV.DATABASE.MONGODB.PORT}/${APP_CONFIG.ENV.DATABASE.MONGODB.NAME}`;
//   const connectionUri = 'mongodb://localhost:27017/ts-node-base';
//   connect(connectionUri);
//   connection.on('error', (err) => {
//     error('Could not connect to Mongodb: ', err);
//   });

//   connection.on('disconnected', () => {
//     error('Database has lost connection...');
//   });

//   connection.on('connected', () => {
//     success(
//       green(
//         `[Mongodb] "${APP_CONFIG.ENV.DATABASE.MONGODB.NAME}" has connected successfully!`
//       )
//     );
//   });

//   connection.on('reconnected', () => {
//     sAwait('Db has reconnected!');
//   });
// }

async function connectRedis() {
  client.ping(() => {
    logger.info(`[Database][Redis] Database has connected successfully!`);
  });

  client.on('error', (err) => {
    logger.error('Redis Client Error', err);
    process.exit();
  });
}

export const databaseConnect = (app: IServer): void => {
  createConnection(databaseConfig)
    .then((connection) => {
      if (connection.isConnected) {
        logger.info(
          `[Database][${databaseConfig.type}] "${APP_CONFIG.ENV.DATABASE.POSTGRES.NAME}" has connected successfully!`
        );
        connectRedis();
        app.start();
      } else {
        logger.error(
          `[Database][${databaseConfig.type}] Database has lost connection.`
        );
      }
    })
    .catch((err) => {
      logger.error(err.stack);
      logger.error(
        `[Database][${databaseConfig.type}] Database connection error.`
      );
      process.exit();
    });
};
