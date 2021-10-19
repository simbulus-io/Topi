import * as log from 'winston';
import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { MongoConfig } from '../config/types/mongo_config';
import { MongoInstance } from '../config/types/mongo_instance';

// Mongo databases (may be on different instances)
export interface MongoDBs {
  topi_db: Db;
}

// Collections

export class MongoHelper {
  // Implement a close function that calls close on the instances
  private static clients: MongoClient[];
  public static async connect(config: MongoConfig): Promise<MongoDBs> {
    this.clients = [];
    // This is needed for the current version of winston to work with jest
    if (process.env.NODE_ENV === 'test') {
      log.add(new log.transports.Console());
    }
    let topi_db;
    try {
      {
        const { instance, dbname } = config.topi_db;
        const results = await this.connect_to_db(instance, dbname);
        topi_db = results.db;
        this.clients.push(results.client);
      }
      return { topi_db };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  private static close() {
    this.clients.forEach(client => client.close());
  }

  private static async connect_to_db(instance: MongoInstance, dbname: string) {
    log.info(`connecting to database ${dbname} on ${JSON.stringify(instance)}`);
    const client = await this.connect_to_instance(instance);
    const db = await client.db(dbname);
    return {client, db};
  }

  private static async connect_to_instance(instance: MongoInstance) {
    let mongo_url: string;
    const mongo_opts: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    // Setup either replica set URL or single node url
    switch (instance.type) {
      case 'uri': {
        mongo_url = instance.uri;
        break;
      }
      case 'host_port': {
        mongo_url = 'mongodb://' + instance.host + ':' + instance.port;
      }
      default: {
        Promise.reject('unknown instance type passed to connect_to_instance');
      }
    }
    const client = await new MongoClient(mongo_url, mongo_opts);
    client.addListener('close', () => {
      log.info('MongoDB disconnect');
    });
    client.addListener('reconnect', () => {
      log.info('MongoDB reconnected');
    });
    await client.connect();
    return client;
  }
}