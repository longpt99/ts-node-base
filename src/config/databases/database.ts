import { green } from 'chalk';
import { join } from 'path';
import { createClient } from 'redis';
import 'reflect-metadata';
import { error, success } from 'signale';
import { ConnectionOptions, createConnection } from 'typeorm';
import { IServer } from '../../app';
import APP_CONFIG from '../app.config';

export const client = createClient({
  socket: {
    host: APP_CONFIG.ENV.DATABASE.REDIS.HOST,
    port: APP_CONFIG.ENV.DATABASE.REDIS.PORT,
  },
  password: APP_CONFIG.ENV.DATABASE.REDIS.PASSWORD,
  database: APP_CONFIG.ENV.DATABASE.REDIS.DATABASE,
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

// function connectPostgresqlDb(app: IServer) {
//   const databaseOptions: ConnectionOptions = {
//     type: 'postgres',
//     host: APP_CONFIG.ENV.DATABASE.POSTGRES.HOST,
//     port: APP_CONFIG.ENV.DATABASE.POSTGRES.PORT,
//     username: APP_CONFIG.ENV.DATABASE.POSTGRES.USERNAME,
//     password: APP_CONFIG.ENV.DATABASE.POSTGRES.PASSWORD,
//     database: APP_CONFIG.ENV.DATABASE.POSTGRES.NAME,
//     synchronize: true,
//     entities: [join(__dirname, '../../api/**/*.entity.{js,ts}')],
//     logging: false,

//     // connectTimeoutMS: 20000,
//     // maxQueryExecutionTime: 20000,
//     // logNotifications: true,
//   };
//   createConnection(databaseOptions)
//     .then((connection) => {
//       if (connection.isConnected) {
//         success(
//           green(
//             `[Database] "${APP_CONFIG.ENV.DATABASE.POSTGRES.NAME}" has connected successfully!`
//           )
//         );
//         app.start();
//       } else {
//         error('Database has lost connection...');
//       }
//     })
//     .catch((err) => {
//       error('Database connection error');
//       console.log(err);
//       process.exit(1);
//     });
// }

async function connectRedis() {
  client.on('error', (err) => {
    console.log('Redis Client Error', err);
    process.exit();
  });

  client.on('connect', (err) =>
    success(green(`[Database][Redis] Database has connected successfully!`))
  );

  await client.connect();
}

export const databaseConfig = (app: IServer) => {
  const databaseOptions: ConnectionOptions = {
    type: 'postgres',
    host: APP_CONFIG.ENV.DATABASE.POSTGRES.HOST,
    port: APP_CONFIG.ENV.DATABASE.POSTGRES.PORT,
    username: APP_CONFIG.ENV.DATABASE.POSTGRES.USERNAME,
    password: APP_CONFIG.ENV.DATABASE.POSTGRES.PASSWORD,
    database: APP_CONFIG.ENV.DATABASE.POSTGRES.NAME,
    synchronize: true,
    entities: [join(__dirname, '../../api/**/*.entity.{js,ts}')],
    logging: false,

    // connectTimeoutMS: 20000,
    // maxQueryExecutionTime: 20000,
    // logNotifications: true,
  };
  createConnection(databaseOptions)
    .then((connection) => {
      if (connection.isConnected) {
        success(
          green(
            `[Database][Postgres] "${APP_CONFIG.ENV.DATABASE.POSTGRES.NAME}" has connected successfully!`
          )
        );
        connectRedis();
        app.start();
      } else {
        error('Database has lost connection...');
      }
    })
    .catch((err) => {
      error('Database connection error');
      console.log(err);
      process.exit();
    });
};
