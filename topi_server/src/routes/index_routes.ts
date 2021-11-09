import * as path from 'path';
import { MongoDBs } from '../helpers/mongo_helper';
import { Request, Response, Router } from 'express';
import { RoutesBase } from './routes_base';
import { serialize } from 'v8';
import userHelper from '../helpers/user_helper';
import eventHelper from '../helpers/schedule_helper';


const ver = (function() {
  try { return require('../../package.json')['version'] } catch (e) { return 'unknown' }
})();

export class IndexRoutes extends RoutesBase {

  constructor(router: Router) {
    super(router);

    router.get('/', (req: Request, res: Response) => {
      res.sendFile('topi.html', { root: path.join(__dirname, '../../', 'public') });
    });

    // register new user, login existing user
    router.post(`${RoutesBase.API_BASE_URL}/register`, userHelper.register)
    router.post(`${RoutesBase.API_BASE_URL}/login`, userHelper.login)
    router.get(`${RoutesBase.API_BASE_URL}/get-info`, userHelper.getInfo)
    router.delete(`${RoutesBase.API_BASE_URL}/delete-event`, userHelper.deleteUser)

    router.get(`${RoutesBase.API_BASE_URL}/get-events`, eventHelper.getEvents)
    router.post(`${RoutesBase.API_BASE_URL}/create-event`, eventHelper.createEvent)
    router.delete(`${RoutesBase.API_BASE_URL}/delete-event/:id`, eventHelper.deleteEvent)
    
    router.get('/foo', (req: Request, res: Response) => {
      res.sendFile('topi.html', { root: path.join(__dirname, '../../', 'public') });
    });

    router.get(`${RoutesBase.API_BASE_URL}/home`, (req: Request, res: Response) => {
      res.sendFile('topi.html', { root: path.join(__dirname, '../../', 'public') });
    });

    router.get(`${RoutesBase.API_BASE_URL}/alive`, (req: any, res: Response) => {
      const rval = {
        status: true,
        version : `version ${ ver } - alive HTTP get`,
      };
      res.json(rval);
    });

    router.post(`${RoutesBase.API_BASE_URL}/alive`, (req: any, res: Response) => {
      const rval = {
        status: 'topi',
        version : `version ${ ver } - alive HTTP post`,
        body: req.body,
      };
      res.json(rval);
    });

    // Example of how to interact with mongo here (Sean)
    router.get(`${RoutesBase.API_BASE_URL}/test_mongo_access`, async (req: any, res: Response) => {
      const mongo: MongoDBs = req.app.get('mongo');
      const db = mongo.topi_db;
      let collections = await db.listCollections().toArray()
      if (collections.length === 0) {
        await db.createCollection('look_a_test_collection');
        collections = await db.listCollections().toArray()
      }
      res.json({ message: 'mongo is alive', collections })
    });

  }
}
