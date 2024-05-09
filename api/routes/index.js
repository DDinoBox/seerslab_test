import express from 'express';
import userRouter from './userRouter.js';
import boardRouter from './boardRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/board', boardRouter);

export { router };