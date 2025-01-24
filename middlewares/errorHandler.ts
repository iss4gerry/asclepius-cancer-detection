import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    res.status(413).json({
      status: 'fail',
      message: 'Payload content length greater than maximum allowed: 1000000',
    });
  } else if (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'An unknown error occurred',
    });
  } else {
    next();
  }
};
export default errorHandler;
