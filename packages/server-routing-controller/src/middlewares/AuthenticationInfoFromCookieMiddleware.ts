import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import * as config from '../../../../config.json';


@Middleware({ type: "before", priority: 10 })
export class AuthenticationInfoFromCookieMiddleware implements ExpressMiddlewareInterface {

  async use(request: Request, response: Response, next: NextFunction) {

    const { cookie } = config;

    const tokenPayload = request.cookies[cookie['token'].payload.name];
    const tokenSignature = request.cookies[cookie['token'].signature.name];

    const context: Express.Context = {
      authInfo: {
        tokenPayload,
        tokenSignature,
      }
    };

    if(tokenPayload && tokenSignature) {
      // request.headers.authorization = `JWT ${token}`;
      context.authInfo.token = tokenPayload.concat('.', tokenSignature);
    }

    request.context = context;

    next();
  }
}
