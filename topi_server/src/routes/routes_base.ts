import * as log from 'winston';
import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router
  } from 'express';


export type RouteErrorCode = 'NotAuthorized' | 'ServerError'

type RouteErrorType = { msg:string, code ?:RouteErrorCode }
declare type RESTResponse<OType> = { data : OType } |
                                  { errors  : RouteErrorType[], data ?: OType }

export const async_middleware = (fn: RequestHandler) =>
  (req:Request, res:Response, next:NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export type PostContext<IType, OType> = {
  url: string;
  req: Request;
  res: Response;
  input: IType;
  no_cache: ()=>void,
  add_error: (msg: string, code?: RouteErrorCode) => any;
  send_data: (data: OType) => void;
}

export type GetContext<OType> = {
  url: string;
  req: Request;
  res: Response;
  no_cache: ()=>void,
  add_error: (msg: string, code?: RouteErrorCode) => any;
  send_data: (data: OType) => void;
}

export class RoutesBase {

  public static readonly API_BASE_URL: string = '/topi/v1.0';

  // members
  router:Router;

  constructor(router: Router) {
    this.router = router;
  }

  public register_get<IType, OType>(url:string,
    handler:(ctx:GetContext<OType>)=>Promise<OType>)
  {
    // relative URL - append API_BASE_URL automatically
    if (url.indexOf('/')!=0) url = `${RoutesBase.API_BASE_URL}/${ url }`;

    this.router.get(url, (req, res)=>{
      this.call_handler(req, res, false, handler);
    });
  }

  public register_post<IType, OType>(url:string,
    handler:(ctx:PostContext<IType, OType>)=>Promise<OType>)
  {
    // relative URL - append API_BASE_URL automatically
    if (url.indexOf('/')!=0) url = `${RoutesBase.API_BASE_URL}/${ url }`;

    this.router.post(url, (req, res)=>{
      this.call_handler(req, res, true, handler);
    });
  }

  private async call_handler<IType, OType>(req:Request,
    res:Response,
    has_body:boolean,
    handler:(ctx:PostContext<IType, OType>)=>Promise<OType>)
  {
    let input:any;
    const url = req.path;

    if (has_body) input = req.body;



    let data:OType = null;
    const errors:RouteErrorType[] = [];
    const ctx = {
      input: input,
      url: url,
      req:req,
      res:res,
      // Helper functions:
      no_cache: ()=>res.setHeader('Cache-Control', 'private, max-age=0, no-cache'),
      add_error:function(msg:string, code?:RouteErrorCode):any {
        errors.push({ msg:msg, code:code });
        return null;
      },
    };

    let did_timeout = false;
    const timeout = setTimeout(function() {
      log.error(`Error, timeout handling route ${ url }`);
      did_timeout = true;
      res.status(503);
      res.send('');
    }, 10000);

    try {
      // Call the handler
      const promise = handler.apply(this, [ctx]);
      data = await promise;
    } catch (e:any) {
      log.error(`Uncaught error in route ${ url } - ${ e }`);
      if (e.stack) log.error(e.stack);
      if (e.msg && e.code) {
        errors.push({ msg:e.msg, code:e.code });
      } else {
        errors.push({ msg:'Server error', code:'ServerError' });
      }
      data = null;
    }

    if (did_timeout) return;
    clearTimeout(timeout);
    const resp:RESTResponse<OType> = { data:data, errors:errors };

    res.status(200);
    res.json(resp);
  }

}
