import { Context, IMiddleware, Middleware, Req, RequestContext } from '@tsed/common';
import { AuthToken } from '../helpers/AuthToken';
import { UserService } from '../Services/UserService';

@Middleware()
export default class UserContextMiddleware implements IMiddleware {

  constructor(private readonly userService: UserService) {
  }

  async use(@Req() request: Req, @Context() context: RequestContext) {

    const token = AuthToken.fromRequest(request);

    if (!token.isValid())
      return;

    const user = await this.userService.getByAuthToken(token);
    context.set('user', user);
  }
}
