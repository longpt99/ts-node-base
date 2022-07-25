import Server from './app';
import { databaseConfig } from './config/databases/database';

databaseConfig(new Server());
