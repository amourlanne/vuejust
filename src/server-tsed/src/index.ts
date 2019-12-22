import {$log, ServerLoader} from "@tsed/common";
import {Server} from "./server";

async function bootstrap() {
  try {
    const server = await ServerLoader.bootstrap(Server, {});

    await server.listen();
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
