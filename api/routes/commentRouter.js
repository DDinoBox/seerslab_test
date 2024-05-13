import express from 'express';
import commentController from '../controllers/commentController.js';
import loginRequired from '../utils/auth.js';

const commentRouter = express.Router();

commentRouter.post('/create', loginRequired, commentController.commentCreate);
commentRouter.get('/:commentId', commentController.getComment);

export default commentRouter;