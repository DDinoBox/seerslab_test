import express from 'express';
import boardController from '../controllers/boardController.js';
import loginRequired from '../utils/auth.js';

const boardRouter = express.Router();

boardRouter.post('/create', loginRequired, boardController.boardCreate);
boardRouter.get('/', boardController.getBoard);
boardRouter.get('/:postId', boardController.getPostDetail);

export default boardRouter;