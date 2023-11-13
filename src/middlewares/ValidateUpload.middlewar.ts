import { randomUUID } from 'crypto';
import path from 'path';
import config from '../config';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, config.uploadPath);
  },
  filename(req, file, callback) {
    callback(null, randomUUID() + path.extname(file.originalname));
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  cb(null, true);
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
    throw new Error('Изображение должно быть в формате PNG, JPG или JPEG.');
  }
};

export const upload = multer({ storage: fileStorage, fileFilter: fileFilter });
