export interface MongoInstanceURI {
  type: 'uri'
  uri: string;
}

export interface MongoInstanceHostPort {
  type: 'host_port'
  host: string | string[]; // support replica set
  port: number;
}

export interface MongoInstanceDocker {
  type: 'docker';
  host?: string;
  port?: string;
}

export type MongoInstance = MongoInstanceURI | MongoInstanceHostPort | MongoInstanceDocker;
