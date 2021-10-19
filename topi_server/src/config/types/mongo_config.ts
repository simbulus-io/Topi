import { MongoInstance } from './mongo_instance';
// ! you can only export once type/interface from files in this directory
// ! otherwise json schema generation (ts2json) breaks

export type MongoConfig = {
  name: 'mongo';
  topi_db: {
    instance: MongoInstance,
    dbname: string,
  },
}