import * as YAML from 'yamljs';
import * as path from 'path';
import * as winston from 'winston';

import fs from 'fs-extra';

const { format } = winston;

const is_test = process.env.NODE_ENV === 'test';
const is_prod = process.env.NODE_ENV === 'production';
const is_dev = process.env.NODE_ENV === 'development';

export function PP(obj: any): string {
  try {
    return '\n' + JSON.stringify(obj, null, 2);
  } catch (e) {
    return '';
  }
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}
export class LoggerHelper {

  public log: any;

  public constructor(log_level: LogLevel, logfile?: string) {

    ////////////////////////////////////////////////
    // winston
    ////////////////////////////////////////////////

    //ToDo: this break logging multiple args - figure out why
    const custom_formatter = format.printf((info: any) => {
      let msg = `level: ${info.level}`;
      msg = !is_test ? `${info.timestamp} ` + msg : msg;
      msg = info.message ? msg + ` ${info.message}` : msg;
      if (info[Symbol.for('level')] === 'error') {
        let stack: string[] | string = [];
        if (info.stack) {
          // throw Error(...)
          stack = info.stack;
        } else if (msg.indexOf('    at ')>=0) {
          // includes a stack, no warning
        } else {
          // throw string
          // tslint:disable-next-line: max-line-length
          msg += `\nWARNING: detected error level log without stack trace - use log.error(new Error(msg))`;
          return msg;
        }
        // limit call stack length in production
        const MAX_LEN = 5;
        let n_more = 0;
        if (is_prod)  {
          if (typeof stack === 'string') { stack = stack.split('\n') }
          const truncated = stack.slice(0, MAX_LEN);
          n_more = stack.length - truncated.length;
          stack = truncated;
        }
        msg += '\n' + stack + (n_more > 0 ? `\n ... plus ${n_more} more` : '');
      }
      return msg;
    });

    // Logger config
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const structured_conf = {
      level: is_prod ? 'info' : log_level,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({
          stack: true,
        }),
        format.splat(),
        format.json(),
      ),
    };

    const unstructured_conf = {
      format: format.combine(
        format.simple(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({
          stack: true,
        }),
        custom_formatter,
      ),
    };

    winston.configure(unstructured_conf);
    this.log = winston;

    // logfile either by construction parameter or config yaml
    let app_config;
    const config_file: string = `${__dirname}/../config.yaml`;
    if (this.is_file(config_file)) {
      app_config = YAML.load(config_file);
    }

    // console logging for dev
    if (!is_prod || app_config && app_config.foreground) {
      this.log.add(new winston.transports.Console({
        level: log_level,
        format: format.combine(
          format.colorize({all:true}),
          format.splat(),
          format.simple(),
          format.errors({
            stack: true,
          }),
          custom_formatter,
        ),
      }));
    }

    // No file logging in test environment
    if (process.env.NODE_ENV === 'test') return;

    // logfile either by construction parameter or config yaml
    if (!logfile && app_config) {
      if (app_config.logfile && this.is_dir(path.dirname(app_config.logfile))) {
        logfile = app_config.logfile;
      } else {
        throw new Error('Unable to setup file logging');
      }
    }

    // file logging
    if (this.is_dir(path.dirname(logfile!))) {
      let opts = {};
      if (is_prod || is_dev) {
        opts = {flags: 'w'};  // append
      } else {
        opts = {flags: 'w'};  // overwrite
      }
      this.log.add(new winston.transports.File({
        filename: logfile,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        options: opts,
        level: log_level,
        format: format.combine(
          format.splat(),
          format.simple(),
          format.errors({
            stack: true,
          }),
          custom_formatter,
        ),
      }));
    }

  }

  private is_dir(the_path: string) {
    try {
      const stat = fs.statSync(the_path);
      return stat.isDirectory();
    } catch (e) {
      return false;
    }
  }

  private is_file(the_path: string) {
    try {
      const stat = fs.statSync(the_path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  }



}
