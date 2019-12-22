import { applyDecorators } from '@tsed/core';
import { IAuthOptions, UseAuth } from '@tsed/common';
import { AuthenticatedMiddleware } from '../middlewares/AuthenticatedMiddleware';

export interface ICustomAuthOptions extends IAuthOptions {
  role?: string;
}

export function Authenticated(options: ICustomAuthOptions = {}): Function {
  return applyDecorators(
    UseAuth(AuthenticatedMiddleware, options),
  );
}
