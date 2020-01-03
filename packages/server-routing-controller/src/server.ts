import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { createConnection, useContainer as useTypeormContainer } from 'typeorm';
import { Action, useContainer as useRoutingControllersContainer, useExpressServer } from 'routing-controllers';
import {Container} from "typedi";
import session from "express-session";

import redis from 'redis';
import corsConfig from '../config/cors';
import i18nConfig from '../config/i18n'
import sessionConfig from '../config/session'
import i18n from "i18n";
import connectRedis from 'connect-redis';

const server = express();

const redisStore = connectRedis(session);
const redisClient = redis.createClient();

redisClient.on('error', (err) => console.log('Redis error: ', err));
redisClient.on('connect', () => console.log('Redis client connected'));

useTypeormContainer(Container);

createConnection().then(async () => {

  console.log('TypeORM MariaDB client connected');

  i18n.configure(i18nConfig);

  server.use(cors(corsConfig));
  server.use(helmet());
  // Use the session middleware
  server.disable('x-powered-by');
  server.use(session({
    ...sessionConfig,
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
  } ));

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());

  server.use(i18n.init);

  server.use(express.static('public'));

  // its important to set container before any operation you do with routing-controllers,
  // including importing controllers
  useRoutingControllersContainer(Container);

  useExpressServer(server, {
    // register created express server in routing-controllers
    development: false,
    controllers: [__dirname + "/controllers/**/*.ts"], // and configure it the way you need (controllers, validation, etc.)
    middlewares: [__dirname + "/middlewares/**/*.ts"],
    interceptors: [__dirname + "/interceptors/**/*.ts"],
    defaultErrorHandler: false, // disable default error handler, only if you have your own error handler
    authorizationChecker: async ({request} : Action, roles: string[]) => {
      const { context } = request;
      const { user } = context;

      if (user && !roles.length)
        return true;
      if (user && roles.includes(user.role))
        return true;

      return false;
    },
    // currentUserChecker: async ({request}: Action) => request.currentUser
  });

  const { PORT = 3000 } = process.env;

// true if file is executed, exclude for jest
  if (require.main === module) {
    server.use(logger('dev'));
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  }
});

export default server;


