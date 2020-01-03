import {Unauthorized} from "ts-httpexceptions";
import { IMiddleware, EndpointInfo, Req, Middleware, Context } from '@tsed/common';

@Middleware()
export class AuthenticatedMiddleware implements IMiddleware {
  public use(@Req() request: Req, @EndpointInfo() endpoint: EndpointInfo, @Context() context: Context) {

    const options = endpoint.get(AuthenticatedMiddleware) || {};

    if(!context.has('user'))
      throw new Unauthorized("Unauthorized");

    if(!options.role)
      return;

    if(context.get('user').role !== options.role)
      throw new Unauthorized("Unauthorized");
  }
}
