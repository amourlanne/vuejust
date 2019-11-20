import {NextFunction, Request, Response} from "express";
import {AuthorizedMiddleware} from "./AuthorizedMiddleware";
import security from '../../config/security';

export class AuthorizedAdminMiddleware extends AuthorizedMiddleware {
  async use(request: any, response: Response, next: NextFunction) {
    return this.useWithRole(request, response, next, [security.Role.Admin])
  }
}
