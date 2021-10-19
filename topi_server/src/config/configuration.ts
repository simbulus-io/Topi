import { Env } from './env';
import { ExpressConfig } from './types/express_config';
import { MongoConfig } from './types/mongo_config';

export interface Configuration {
  env: Env;
  express: ExpressConfig;
  mongo: MongoConfig;
}