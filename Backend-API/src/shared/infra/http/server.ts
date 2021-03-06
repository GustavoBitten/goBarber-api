import 'reflect-metadata';
import 'dotenv/config';
import express, { json, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import '@shared/infra/typeorm/index';
import '@shared/container';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();

app.use(cors());
app.use(json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => console.log('Server online on port 3333'));
