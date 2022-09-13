import Server from './app';
import { databaseConfig } from './configs/databases/database';

databaseConfig(new Server());
