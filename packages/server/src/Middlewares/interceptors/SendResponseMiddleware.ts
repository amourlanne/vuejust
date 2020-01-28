import {
  Context, ConverterService,
  OverrideProvider,
  Req,
  RequestContext,
  Res,
  ResponseData,
  SendResponseMiddleware as BaseSendResponseMiddleware,
} from '@tsed/common';
import { AuthToken } from '../../helpers/AuthToken';
import { isStream } from '@tsed/core';

// @OverrideProvider(BaseSendResponseMiddleware)
// export class SendResponseMiddleware {
//   public use(@Req() request: Req, @Res() response: Res, @Context() context: RequestContext): any {
//
//     const {ctx: {data, endpoint}} = request;
//     console.log(data, context);
//     if (context.has('user')) {
//
//       const token = AuthToken.fromUser(context.get('user'));
//
//       response.cookie("token_payload", token.getPayload(), {
//         sameSite: true,
//         maxAge: 1800000 // 30min
//       });
//
//       response.cookie("token_signature", token.getSignature(), {
//         httpOnly: true,
//         sameSite: true,
//       });
//     }
//
//     // if(typeof data === 'string') {
//     //   data = {
//     //     message: data
//     //   };
//     // }
//
//     return response.send();
//   }
// }

@OverrideProvider(BaseSendResponseMiddleware)
export class SendResponseMiddleware {
  constructor(private converterService: ConverterService) {
  }

  public use(@ResponseData() data, @Res() response: Res, @Context() context: RequestContext): any {

    if (context.has('user')) {

      const token = AuthToken.fromUser(context.get('user'));

      response.cookie('token_payload', token.getPayload(), {
        sameSite: true,
        maxAge: 1800000, // 30min
      });

      response.cookie('token_signature', token.getSignature(), {
        httpOnly: true,
        sameSite: true,
      });
    }

    if (data === undefined) {
      return response.send();
    }

    if (isStream(data)) {
      data.pipe(response);

      return response;
    }

    if(typeof data === 'string') {
      return response.json({
        message: data
      })
    }

    const payload = this.converterService.serialize(data /*, {type: endpoint.type}*/);

    return response.json(payload);
  }
}
