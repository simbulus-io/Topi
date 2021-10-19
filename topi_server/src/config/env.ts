import * as log from 'winston';
import * as Path from 'path';
import { ConfigUtil } from './config_util';
import { each, find } from 'lodash';
/* eslint-disable indent */



const DEFAULT_ENV_FILEPATH = `${Path.dirname(process.argv[1])}/../default_env.yaml`;

export type EnvName =
  'development' |
  'docker';


export class Env {

  public data: any;
  public readonly name: EnvName;
  public authority: string = '';

  constructor(name: EnvName, filepath?: string) {
    this.name = name;
    filepath = DEFAULT_ENV_FILEPATH;
    this.data = ConfigUtil.load_yaml_or_error(filepath);
    // This bit of whackness is because the env file YAML is nested and we
    // don't care about the outer key
    this.data = Object.freeze(this.data[Object.keys(this.data)[0]]);
  }

  public get config_dir(): string {
    // ES6 switch with return value using fat-arrow IIFE
    return (() => {
      switch (this.name) {
      default:
        return Path.dirname(process.argv[1]);
      }
    })();
  }

  // vanity helpers
  public get is_dev(): boolean { return this.name === 'development' }

}
