import 'dotenv/config';
import { userRouter } from './routes/userRouter.js';
import { jobRouter } from './routes/jobRouter.js'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ServerError } from '../types.js';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser'

const app = express();
const PORT = process.env.PORT || 3030;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '../dist')));

//handling routes to server
app.use('/user', userRouter);
app.use('/job', jobRouter);

app.use('/', (_req:Request, res:Response) => {
  return res.sendFile(join(__dirname, '../dist/index.html'));
});

//handling unknown routes
app.use('*', (_req:Request, res:Response) => {
  return res.status(404).send('Page not found')
});


app.use((err:unknown, _req:Request, res:Response, _next:NextFunction) => {
  const defaultErr:ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));