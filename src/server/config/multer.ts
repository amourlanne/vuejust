import * as multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      return "files/"
    },
    filename: (req: any, file: any, cb: any) => {
      return file;
    },
  }),
  fileFilter: (req: any, file: any, cb: any) => {
  },
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 2,
  },
};

