import * as log from 'winston';
import { ConfigBase } from './config_base';
import { Configuration } from './configuration';
import { each, map } from 'lodash';
import { Env } from './env';

type ConfigBaseConstructor<T> = new (env: Env, config_input: any) => T;

// Pluggable configuration different config instantiations  may have different configuration requirments
type TopiConfig = Pick<Configuration, 'env' | 'express' | 'mongo'  >;

class TopiConfigFactory {

  private env: Env;
  private config_input: any;

  private ConfigBases: ConfigBase[] = [];
  public constructor(env: Env, config_input: any, classes: ConfigBaseConstructor<ConfigBase>[])
  {
    log.debug('TopiConfigFactory');
    this.env = env;
    this.config_input = config_input;
    each(classes, (cls: any) => {
      this.ConfigBases.push(TopiConfigFactory.factory(cls, env, config_input));
    });
  }

  // Implementation is loosely typed
  public async configure(): Promise<any> {
    const blobs = await Promise.all(map(this.ConfigBases, (c) => c.configure()));
    const config: any = {};
    // configure always returns the env blob
    config.env = this.env;
    // add blobs from custom ConfigBases
    each(blobs, (b) => {
      config[b.name] = ConfigBase.apply_argv_overrides(b);
    });
    return config;
  }

  private static factory<T extends ConfigBase>(t: ConfigBaseConstructor<T>, env: Env, config_input: any): T {
    return new t(env, config_input);
  }
}

export {
  Env,
  TopiConfigFactory,
  TopiConfig,
};
