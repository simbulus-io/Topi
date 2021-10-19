import * as Path from 'path';
import * as fs from 'fs';
import * as log  from 'winston';

import {
  forOwn,
  isEmpty,
  isObjectLike,
} from 'lodash';

import YAML from 'yaml';

const logger: { log: Function, warn: Function, info: Function, debug: Function, error: Function } = console;

export class ConfigUtil {

  public static is_file(path: string): boolean {
    try {
      if (!path) return false;
      const stat = fs.statSync(path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  }

  public static is_dir(path: string): boolean {
    try {
      if (!path) return false;
      const stat = fs.statSync(path);
      return stat.isDirectory();
    } catch (e) {
      return false;
    }
  }

  public static load_yaml(path: string): any {
    path = Path.resolve(path);
    try {
      if (this.is_file(path)) {
        logger.debug(`Loading ${path}`);
        const file = fs.readFileSync(path, 'utf8');
        return YAML.parse(file);
      } else {
        logger.debug(`Can't stat ${path}`);
        return null;
      }
    } catch (e) {
      throw new Error(`Unexpected Exception loading ${path}`);
    }
  }

  public static desymbolize_keys(obj: any): any {
    try {
      // lodash forOwn
      forOwn(obj, (value, key) => {
        if (isObjectLike(value)) { // lodash isObjectLike (true for Arrays and Hash ie non-primitive types)
          obj[key] = ConfigUtil.desymbolize_keys(value);
        }
        const new_key = key.replace(':', '');
        if (new_key !== key) {
          obj[new_key] = obj[key];
          delete obj[key]; // delete the old key
        }
      });
      return obj;
    } catch (e) {
      log.error(e);
    }
  }

  public static load_yaml_or_error(path: string): any {
    path = Path.resolve(path);
    try {
      if (this.is_file(path)) {
        const file = fs.readFileSync(path, 'utf8');
        const rval = YAML.parse(file);
        const new_rval = ConfigUtil.desymbolize_keys(rval);
        return isEmpty(new_rval) ? rval : new_rval;
      } else {
        const msg = `Can't stat ${path}`;
        throw new Error(msg);
      }
    } catch (e) {
      const msg = `Unexpected Exception loading ${path}`;
      throw new Error(msg);
    }
  }

}