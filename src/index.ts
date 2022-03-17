import app from './app';
import { databaseConnect } from './config/databases/database';

databaseConnect(app);
