import * as schema from './types/express_config.json';

import Ajv from 'ajv';
import { ConfigBase } from './config_base';
import { Env } from './env';
import { ExpressConfig } from './types/express_config';
import { hostname } from 'os';

const ajv = new Ajv({ allowUnionTypes: true });

export class Express extends ConfigBase {

  private readonly local_path: string;

  constructor(env: Env, config_input:any) {
    super(env, config_input);
  }

  public invariants(): void {
  }

  public async configure():Promise<ExpressConfig> {

    if (!this.config_input.express) return Promise.reject('missing express sector in input config');
    const valid = ajv.validate(schema, this.config_input.express);
    const { express } = this.config_input;

    if (valid) {
      this.env.authority = `${hostname()}:${express.express_port}`;
      return Promise.resolve(express);
    } else {
      return Promise.reject(`${JSON.stringify(express, null, 2)} failed schema validation\n${ajv.errorsText()}`);
    }
  }

}
