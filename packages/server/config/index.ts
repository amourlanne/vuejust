import typeorm from './packages/typeorm';
import cors from './packages/cors';
import server from './packages/server';
import security from './packages/security';
import nodemailer from './packages/nodemailer';
import multer from './packages/multer';

export default {
  typeorm: typeorm,
  cors: cors,
  server: server,
  security: security,
  nodemailer: nodemailer,
  multer: multer
}
