import {Configuration, EndpointInfo, EndpointMetadata, IMiddleware, OverrideProvider, Req, Res} from "@tsed/common";
import {MultipartFileMiddleware as BaseMultipartFileMiddleware} from "@tsed/multipartfiles";
import multer from 'multer';
import {BadRequest} from "ts-httpexceptions";
import {promisify} from "util";

@OverrideProvider(BaseMultipartFileMiddleware)
export class MultipartFileMiddleware implements IMiddleware {

  private multer: any = multer;

  constructor(@Configuration() private configuration: Configuration) {
  }

  async use(@EndpointInfo() endpoint: EndpointMetadata, @Req() request: Req, @Res() response: Res) {

    try {
      const endpointConfiguration = endpoint.store.get(BaseMultipartFileMiddleware);

      return await promisify(this.invoke(endpointConfiguration))(request, response);
    } catch (er) {
      throw er.code ? new BadRequest(`${er.message} ${er.field || ""}`.trim()) : er;
    }
  }

  invoke(conf: any) {
    const dest = this.configuration.uploadDir;
    const options = Object.assign({dest}, this.configuration.get("multer") || {}, conf.options || {});

    if (!conf.any) {
      const fields = conf.fields.map(({name, maxCount}: any) => ({name, maxCount}));

      return this.multer(options).fields(fields);
    }

    return this.multer(options).any();
  }
}
