import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const KB = 1000;
const MB = 1000 * KB;
const MAX_IMG_SIZE = 10 * MB;
const ALLOWED_IMG_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log(req.originalUrl);
          const path = req.originalUrl.split('/')[1];
          cb(null, `./uploads/${path}`);
        },
        filename: (req, file, cb) => {
          const id = req.user['_id'];
          const extension = file.originalname.split('.').pop();
          cb(null, `${id}.${extension}`);
        },
      }),
      limits: {
        fileSize: MAX_IMG_SIZE,
      },
      fileFilter: (req, file, cb) => {
        const allowed = ALLOWED_IMG_TYPES.includes(file.mimetype);
        const error = allowed ? null : new Error('Invalid file type.');
        cb(error, allowed);
      },
    };
  }
}
