import { Context, OverrideProvider, RequestContext, Res, ResponseData, SendResponseMiddleware as BaseSendResponseMiddleware } from '@tsed/common';
import { AuthToken } from '../../helpers/AuthToken';

@OverrideProvider(BaseSendResponseMiddleware)
export class SendResponseMiddleware extends BaseSendResponseMiddleware {
  // @ts-ignore
  public use(@ResponseData() data: any, @Res() response: Res, @Context() context: RequestContext): any {

    if (context.has('user')) {

      const token = AuthToken.fromUser(context.get('user'));

      response.cookie("token_payload", token.getPayload(), {
        sameSite: true,
        maxAge: 1800000 // 30min
      });

      response.cookie("token_signature", token.getSignature(), {
        httpOnly: true,
        sameSite: true,
      });
    }

    if(typeof data === 'string') {
      data = {
        message: data
      };
    }

    return super.use(data, response);
  }
}
