import { OverrideProvider } from '@tsed/di';
import { Err, GlobalErrorHandlerMiddleware, Req, Res } from '@tsed/common';
import {Exception} from "ts-httpexceptions";

@OverrideProvider(GlobalErrorHandlerMiddleware)
export class ErrorHandlerMiddleware extends GlobalErrorHandlerMiddleware {

  use(@Err() error: any, @Req() request: Req, @Res() response: Res): any {
    const toHTML = (message = "") => message.replace(/\n/gi, "<br />");
    const toJSON = (error) => ({
      error: {
        code: error.status,
        name: error.name,
        message: error.message,
      },
    });

    if (error instanceof Exception || error.status) {
      request.log.error({
        error: {
          message: error.message,
          stack: error.stack,
          status: error.status,
          origin: error.origin
        }
      });
      this.setHeaders(response, error, error.origin);

      response.status(error.status).send(toJSON(error));

      return;
    }

    if (typeof error === "string") {
      response.status(404).send(toHTML(error));

      return;
    }

    request.log.error({
      error: {
        status: 500,
        message: error.message,
        stack: error.stack,
        origin: error.origin
      }
    });

    this.setHeaders(response, error, error.origin);

    response.status(error.status || 500).send("Internal Error");

    return;
  }
}
