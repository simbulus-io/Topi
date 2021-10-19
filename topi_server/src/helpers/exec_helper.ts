import * as fs from 'fs-extra';
import * as log from 'winston';

import { spawn } from 'child_process';
import util from 'util';

export function delayed_invocation(fn: () => void, delay: number) {
  // if you want to return a value from the job make sure you use a typed promise
  return new Promise<any>((resolve, reject) => setTimeout(() => {
    try {
      // invoke user provided function
      const rval = fn();
      // resolve the promise
      resolve(rval);
    } catch (e) {
      reject(e);
    }
  }, delay));
}

// Simple wrapper promise wrapper around asycn node proc exec
const exec = util.promisify(require('child_process').exec);
export async function exec_cmd(cmd: string) {
  try {
    await exec(cmd);
    // ToDo: rename
    return true;
  } catch (e) {
    log.error(e);
    return false;
  }
}

// promisify spawn with detach
//
// this proc will not die when the parent process dies
export async function spawn_cmd(cmd: string, opts: string[], logfile?: string) {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      let sp;
      if (logfile) {
        // the process will continue to write to the logs if the parent node process dies
        const log = await fs.open(logfile, 'a');
        sp = spawn(cmd, opts, { detached: true, stdio: ['ignore', log, log] });
      } else {
        sp = spawn(cmd, opts, { detached: true, stdio: 'ignore' });
      }
      sp.on('close', (code) => {
        resolve(code === 0);
      });
      sp.unref();
    } catch (e) {
      log.error(e);
      reject(e);
    }
  });
}

export async function exec_cmd_stdout(cmd: string):Promise<string> {
  try {
    const { stdout } = await exec(cmd);
    return stdout;
  } catch (e) {
    log.error(e);
    return Promise.reject(e);
  }
}
