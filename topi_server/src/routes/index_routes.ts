import * as path from 'path';
import { Request, Response, Router } from 'express';
import { RoutesBase } from './routes_base';



const ver = (function() {
  try { return require('../../package.json')['version'] } catch (e) { return 'unknown' }
})();

export class IndexRoutes extends RoutesBase {

  constructor(router: Router) {
    super(router);


    router.get('/', (req: Request, res: Response) => {
      res.sendFile('topi.html', { root: path.join(__dirname, '../../', 'public') });
    });

    router.get(`${RoutesBase.API_BASE_URL}/home`, (req: Request, res: Response) => {
      res.sendFile('topi.html', { root: path.join(__dirname, '../../', 'public') });
    });

    router.get(`${RoutesBase.API_BASE_URL}/alive`, (req: any, res: Response) => {
      const rval = {
        status: 'topi',
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

  }
}
