import * as log from 'winston';

import { merge, pick, transform } from 'lodash';

import { Env } from './env';
import { exit } from 'process';
import fs from 'fs-extra';
import minimist from 'minimist';

// Adam review and remove comment
export abstract class ConfigBase {

  // [Static constructor pattern](https://basarat.gitbook.io/typescript/main-1/staticconstructor)
  public static readonly OVERRIDES: any = ConfigBase.initialize();
  public static initialize() {
    try {
      // convert node argv to javascript object
      // convert "true|false" to corresponding bool
      const argv = minimist(process.argv.slice(2), { boolean:true });
      // fargs from a json file
      let fargs: any = {};
      if(argv.fargs) {
        try {
          fs.accessSync(argv.fargs, fs.constants.R_OK );
          fargs = JSON.parse(fs.readFileSync(argv.fargs, 'utf8'));
        } catch(e) {
          log.error(e);
        }
      }
      // args from the CL
      const args = transform(argv, (memo:any, value:string, key:any) => {
        const [config, option] = key.split(':');
        if(option) {
          // equivalent to ||= in ruby
          memo[config] = memo[config] || {};
          memo[config][option] = value;
        }
        return memo;
      });
      return merge(fargs, args);
    } catch(e) {
      log.error(e);
      exit(1);
    }
  }

  protected readonly env: Env;
  protected readonly config_input: any;
  constructor(env: Env, config_input: any) {
    this.env = env;
    this.config_input = config_input;
  }

  public static apply_argv_overrides<T>(config: T):T {
    // ToDo: enforce name key for config blobs
    if(!(config as any).name) return config;
    const name = (config as any).name;
    const overrides = ConfigBase.OVERRIDES[name];
    if(overrides) {
      // pick ensures only keys from config objects are selected from overrides object
      return merge(config, pick(overrides, Object.keys(config)));
    } else {
      return config;
    }
  }

  // Abstracts
  public abstract invariants(): void;
  public abstract configure(): Promise<any>;

  // static constructor
}
