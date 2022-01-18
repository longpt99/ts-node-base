import { green } from 'chalk';
import { connect, connection } from 'mongoose';
import { await as sAwait, error, success } from 'signale';
import APP_CONFIG from '../app.config';

function connectMongoDB() {
  // const connectionUri = `mongodb://${APP_CONFIG.DATABASE.MONGODB.USERNAME}:${APP_CONFIG.DATABASE.MONGODB.PASSWORD}@${APP_CONFIG.DATABASE.MONGODB.HOST}:${APP_CONFIG.DATABASE.MONGODB.PORT}/${APP_CONFIG.DATABASE.MONGODB.NAME}`;
  // const connectionUri = `mongodb://${APP_CONFIG.DATABASE.MONGODB.HOST}
  // :${APP_CONFIG.DATABASE.MONGODB.PORT}/${APP_CONFIG.DATABASE.MONGODB.NAME}`;
  const connectionUri = 'mongodb://localhost:27017/ts-node-base';
  connect(connectionUri);
  connection.on('error', (err) => {
    error('Could not connect to Mongodb: ', err);
  });

  connection.on('disconnected', () => {
    error('Database has lost connection...');
  });

  connection.on('connected', () => {
    success(
      green(
        `[Mongodb] "${APP_CONFIG.DATABASE.MONGODB.NAME}" has connected successfully!`
      )
    );
  });

  connection.on('reconnected', () => {
    sAwait('Db has reconnected!');
  });
}

export const databaseConnect = () => {
  connectMongoDB();
};
