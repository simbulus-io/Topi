import * as log from 'winston';
import * as path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import { ConfigUtil } from './config/config_util';
import { Env, TopiConfig, TopiConfigFactory } from './config/topi_config';
import { EnvName } from './config/env';
import { Express } from './config/express';
import { IndexRoutes } from './routes/index_routes';
import { Mongo } from './config/mongo';
import { MongoDBs, MongoHelper } from './helpers/mongo_helper';
import { PP } from './helpers/logger_helper';

export class Server {

  public static bootstrap(): Server {
    return new Server();
  }

  public app: express.Application = express();

  public async setup() {
    await this.config();
    this.routes();
  }

  public async config() {
    try {
      this.app.use(express.static('public'));

      const env_name = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV as EnvName;
      const env = new Env(env_name);

      const local_path = `${env.config_dir}/config.yaml`;

      // any okay here - the blob in the yaml are JSON schema verified
      const config_input: any = ConfigUtil.load_yaml_or_error(local_path);

      // config
      const wmc = new TopiConfigFactory(env, config_input, [Express, Mongo]);
      const config: TopiConfig = await wmc.configure();
      log.info('TopiConfig');
      log.info(PP(config));
      this.app.set('config', config);

      const mongo = await MongoHelper.connect(config.mongo);
      this.app.set('mongo', mongo);

      // (SK needed?)
      this.app.use(cookieParser());

      // add static pathsb
      this.app.use(express.static(path.join(__dirname, 'public')));

      this.app.use(bodyParser.json());

      // mount query string parser
      this.app.use(bodyParser.urlencoded({ extended: true }));

      // catch 404 and forward to error handler
      this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
      });

      // error handling
      this.app.use(errorHandler());
    } catch (e) {
      log.error(e);
      process.exit(1);
    }
  }

  private routes() {
    const router = express.Router();

    const mongo: MongoDBs = this.app.get('mongo');

    // routes here
    new IndexRoutes(router);

    this.app.use(router);
    //this.app.use(Routes);
  }

}
