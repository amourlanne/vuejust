import { IModuleOptions } from '@tsed/di';

export default <Partial<IModuleOptions>> {
  rootDir: "src",
  acceptMimes: ["application/json"],
  port: 3000,
  logger: {
    debug: false,
    logRequest: false,
    requestFields: ["body", "reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  mount: {
    "/": "src/controllers/**/*.ts"
  },
  swagger: [
    {
      path: "/api-docs"
    }
  ],
  componentsScan: [
    "src/middlewares/**/*.ts",
    "src/services/**/*.ts",
    "src/converters/**/*.ts"
  ],
}
