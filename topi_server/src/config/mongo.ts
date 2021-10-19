import * as schema from './types/mongo_config.json';

import Ajv from 'ajv';
import { ConfigBase } from './config_base';
import { Env } from './env';
import { MongoConfig } from './types/mongo_config';
import { exec_cmd_stdout } from './../helpers/exec_helper';
import { omit } from 'lodash';

const ajv = new Ajv({ allowUnionTypes: true });

export class Mongo extends ConfigBase {

  constructor(env: Env, config_input: any) {
    super(env, config_input);
  }

  public invariants(): void {

  }

  public async configure(): Promise<MongoConfig> {

    if (!this.config_input.mongo) return Promise.reject('missing mongo sector in input config');

    // this is the syntax is for destructuring and specifying the type
    const { mongo }:{mongo: MongoConfig } = this.config_input;

    //const valid = new Ajv({ allowUnionTypes: true }).validate(schema, mongo)
    const valid = ajv.validate(schema, mongo);
    if (valid) {
      // We need to translate the docker instance to the host/port format (to actually connect)
      for (const key of Object.keys(omit(mongo, ['name']))) {
        const m = mongo as any;
        if ((m)[key].instance.type === 'docker') {
          const ip = await this.local_docker_mongo_ip_addr();
          if (!ip) throw new Error('local docker mongo is not running - use start_local_mongo.rb from oryx');
          m[key] = {
            instance: { type: 'host_port', host: ip, port: 27017 },
            dbname: m[key].dbname,
          };
        }
      }
      return Promise.resolve(mongo);
    } else {
      return Promise.reject(`${JSON.stringify(mongo, null, 2)} failed schema validation\n${ajv.errorsText()}`);
    }
    return Promise.reject();
  }

  private async local_docker_mongo_ip_addr() {
    // if this command fails it returns an empty string and exit code 0
    const inspect = 'docker inspect --format=\'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}\' local-mongo';
    let ip = await (await (exec_cmd_stdout(inspect))).trim();
    ip = ip.trim();
    // test length because of above
    if (!ip.length) {
      throw new Error('Failed to connect to docker container local-mongo, did you run oryx/bin/start_local_mongo.rb?');
    } else {
      return ip;
    }
  }

}
