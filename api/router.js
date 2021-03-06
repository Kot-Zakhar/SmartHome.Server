import express from 'express';
import userRouter from './routes/usersRouter.js';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);

export default apiRouter;

