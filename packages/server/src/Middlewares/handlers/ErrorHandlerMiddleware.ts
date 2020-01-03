import { Constant, OverrideProvider } from '@tsed/di';
import { Err, GlobalErrorHandlerMiddleware, IResponseError, Req, Res } from '@tsed/common';
import { Exception } from 'ts-httpexceptions';

@OverrideProvider(GlobalErrorHandlerMiddleware)
export class ErrorHandlerMiddleware extends GlobalErrorHandlerMiddleware {

  @Constant("errors.headerName", "errors")
  protected headerName: string;

  use(@Err() error: any, @Req() request: Req, @Res() response: Res): any {

    if (error instanceof Exception || error.status) {

      this.setHeaders(response, error, error.origin);

      response.status(error.status).json({
        error: {
          code: error.status,
          name: error.name,
          message: error.message,
        },
      });

      return;
    }

    if (typeof error === 'string') {
      response.status(404).json({
        error: {
          code: 404,
          message: error,
        },
      });

      return;
    }

    this.setHeaders(response, error, error.origin);

    response.status(error.status || 500).json({
      error: {
        code: error.status || 500,
        name: 'Internal Error',
        message: error.message,
      },
    });

    return;
  }
}
