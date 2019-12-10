import * as multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: (request: any, file: any, callback: any) => {
      callback(null, "public/images");
    },
    filename: (request: any, file: any, callback: any) => {
      callback(null, file.originalname);
    },
  }),
  // fileFilter: (req: any, file: any, cb: any) => {
  //   return file;
  // },
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 2,
  },
};
