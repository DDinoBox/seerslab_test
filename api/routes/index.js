import express from 'express';
import userRouter from './userRouter.js';
import boardRouter from './boardRouter.js';
import commentRouter from './commentRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/board', boardRouter);
router.use('/comment', commentRouter);

export { router };