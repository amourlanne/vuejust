import typeorm from './modules/typeorm';
import cors from './modules/cors';
import server from './modules/server';
import security from './modules/security';
import nodemailer from './modules/nodemailer';
import multer from './modules/multer';

export default {
  typeorm: typeorm,
  cors: cors,
  server: server,
  security: security,
  nodemailer: nodemailer,
  multer: multer
}
