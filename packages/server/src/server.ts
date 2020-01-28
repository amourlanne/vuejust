import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import { getConnectionManager } from 'typeorm';

import "@tsed/swagger";
import "@tsed/multipartfiles";

import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import helmet from 'helmet';
import config from '../config';
import UserContextMiddleware from './Middlewares/UserContextMiddleware';


@ServerSettings(config.server)
export class Server extends ServerLoader {
  constructor(settings) {
    super(settings);
  }

  async $beforeInit() {
    const connectionManager = getConnectionManager();
    const connection = connectionManager.create(config.typeorm);

    await connection.connect(); // performs connection
  }

  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $beforeRoutesInit(): void | Promise<any> {
    this
      .use(cors(config.cors))
      .use(helmet())
      .use(GlobalAcceptMimesMiddleware)
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride());

    /** global middlewares */
    this
      .use(UserContextMiddleware);
  }
}

