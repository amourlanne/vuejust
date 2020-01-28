import multer from 'multer';
import TokenGenerator from "uuid-token-generator";
import path from 'path';

export default {
  storage: multer.diskStorage(
    {
      destination: 'public/media',
      filename: function ( req, file, cb ) {
        cb( null, new TokenGenerator(TokenGenerator.BASE16).generate() + path.extname(file.originalname));
      }
    }
  ),
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 2,
  },
};
