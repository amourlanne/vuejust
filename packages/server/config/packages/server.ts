import { IModuleOptions } from '@tsed/di';
import multer from './multer';

export default <Partial<IModuleOptions>> {
  rootDir: "src",
  acceptMimes: ["application/json", "multipart/form-data"],
  port: 3000,
  logger: {
    debug: false,
    logRequest: false,
    requestFields: ["body", "reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  mount: {
    "/": "src/Controller/**/*.ts"
  },
  swagger: [
    {
      path: "/api-docs"
    }
  ],
  statics: {
    "/": "public"
  },
  componentsScan: [
    "src/Middlewares/**/*.ts",
    "src/Services/**/*.ts",
    "src/Converters/**/*.ts"
  ],
  uploadDir: "public/media",
  multer: multer
}
